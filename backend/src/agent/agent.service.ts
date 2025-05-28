import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, interval } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable()
export class AgentService {
  constructor(private configService: ConfigService) {}

  getStream() {
    const tokens = ['Hello', 'world!', 'This', 'is', 'a', 'test.'];

    return interval(500).pipe(
      take(tokens.length),
      map(i => ({
        data: tokens[i],
      })),
    );
  }

  getOpenAIConfig() {
    return {
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      model: this.configService.get<string>('OPENAI_MODEL', 'gpt-4'),
      temperature: this.configService.get<number>('OPENAI_TEMPERATURE', 0.7),
      maxTokens: this.configService.get<number>('OPENAI_MAX_TOKENS', 1000),
    };
  }
} 