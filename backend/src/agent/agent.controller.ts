import { Controller, Post, Res, Body } from '@nestjs/common';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText, pipeDataStreamToResponse } from 'ai';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import * as config from 'config';

// Create a configured OpenAI instance
const openai = createOpenAI({
  apiKey: config.get('openai.apiKey'),
  compatibility: 'strict', // Enable strict mode for OpenAI API
});

interface StreamRequest {
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
}

@ApiTags('Agent')
@Controller('agent')
export class AgentController {
  @Post('stream')
  @ApiOperation({
    summary: 'Stream chat response',
    description: 'Streams a chat response from the AI model based on the provided messages.',
  })
  @ApiBody({
    description: 'The messages to generate a response for',
    type: Object,
    schema: {
      type: 'object',
      properties: {
        messages: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              role: {
                type: 'string',
                enum: ['user', 'assistant'],
              },
              content: {
                type: 'string',
              },
            },
          },
        },
      },
      required: ['messages'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully streaming chat response',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'string',
          example: 'Here is a new holiday tradition...',
        },
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error occurred while streaming',
  })
  async stream(@Body() body: StreamRequest, @Res() res: Response) {
    console.log('IN -> controller.stream()');
    try {
      // Set proper headers for SSE
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      res.setHeader('Access-Control-Allow-Origin', '*');

      pipeDataStreamToResponse(res, {
        execute: async dataStreamWriter => {
          const result = streamText({
            model: openai.chat(config.get('openai.model')),
            messages: body.messages,
            maxTokens: config.get('openai.maxTokens'),
            temperature: config.get('openai.temperature'),
          });

          // Write initial message format
          dataStreamWriter.writeData(JSON.stringify({
            role: 'assistant',
            content: '',
          }));

          // Stream the content
          result.mergeIntoDataStream(dataStreamWriter);
        },
        onError: error => {
          console.error('Stream error:', error);
          return error instanceof Error ? error.message : String(error);
        },
      });
      
      console.log('OUT <- controller.stream()');
    } catch (error) {
      console.error('Error in stream:', error);
      res.status(500).json({ error: error.message || 'An error occurred' });
    }
  }
}
