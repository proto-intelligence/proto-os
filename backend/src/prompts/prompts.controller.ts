import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PromptsService } from './prompts.service';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';
import { Prompt } from './entities/prompt.entity';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiResponse,
  ApiExtraModels,
} from '@nestjs/swagger';

@ApiTags('prompts')
@ApiExtraModels(Prompt)
@Controller('prompts')
export class PromptsController {
  constructor(private readonly promptsService: PromptsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new prompt' })
  @ApiBody({ type: CreatePromptDto })
  @ApiResponse({ status: 201, type: Prompt })
  create(@Body() createPromptDto: CreatePromptDto): Promise<Prompt> {
    return this.promptsService.create(createPromptDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all prompts' })
  @ApiResponse({ status: 200, type: [Prompt] })
  findAll(): Promise<Prompt[]> {
    return this.promptsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific prompt by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the prompt' })
  @ApiResponse({ status: 200, type: Prompt })
  findOne(@Param('id') id: string): Promise<Prompt> {
    return this.promptsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a prompt by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the prompt to update' })
  @ApiBody({ type: UpdatePromptDto })
  @ApiResponse({ status: 200, type: Prompt })
  update(
    @Param('id') id: string,
    @Body() updatePromptDto: UpdatePromptDto,
  ): Promise<Prompt> {
    return this.promptsService.update(id, updatePromptDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a prompt by ID' })
  @ApiParam({ name: 'id', description: 'UUID of the prompt to delete' })
  @ApiResponse({ status: 200, description: 'Successfully deleted' })
  remove(@Param('id') id: string): Promise<void> {
    return this.promptsService.remove(id);
  }

  @Get('search/by-tags')
  @ApiOperation({ summary: 'Search prompts by one or more tags' })
  @ApiQuery({
    name: 'tags',
    required: true,
    type: [String],
    example: ['health', 'wellness'],
  })
  @ApiResponse({ status: 200, type: [Prompt] })
  searchByTags(@Query('tags') tags: string[] | string): Promise<Prompt[]> {
    const parsedTags = Array.isArray(tags) ? tags : [tags];
    return this.promptsService.searchByTags(parsedTags);
  }

  @Get('search/by-collection')
  @ApiOperation({ summary: 'Search prompts by collection name' })
  @ApiQuery({ name: 'collection', required: true, example: 'wellness' })
  @ApiResponse({ status: 200, type: [Prompt] })
  searchByCollection(
    @Query('collection') collection: string,
  ): Promise<Prompt[]> {
    return this.promptsService.searchByCollection(collection);
  }

  @Get('search/by-text')
  @ApiOperation({ summary: 'Search prompts by prompt content' })
  @ApiQuery({
    name: 'q',
    required: true,
    description: 'Text to search in actualPrompt',
  })
  @ApiResponse({ status: 200, type: [Prompt] })
  searchByPromptText(@Query('q') q: string): Promise<Prompt[]> {
    return this.promptsService.searchByPromptText(q);
  }

  @Get('tags/unique')
  @ApiOperation({ summary: 'Get all unique tags' })
  @ApiResponse({
    status: 200,
    type: [String],
    description: 'List of all unique tags',
  })
  getAllTags(): Promise<string[]> {
    return this.promptsService.getAllTags();
  }

  @Get('collections/unique')
  @ApiOperation({ summary: 'Get all unique collections' })
  @ApiResponse({
    status: 200,
    type: [String],
    description: 'List of all unique collections',
  })
  getAllCollections(): Promise<string[]> {
    return this.promptsService.getAllCollections();
  }
}
