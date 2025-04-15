import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Prompt } from './entities/prompt.entity';
import { CreatePromptDto } from './dto/create-prompt.dto';
import { UpdatePromptDto } from './dto/update-prompt.dto';

@Injectable()
export class PromptsService {
  constructor(
    @InjectRepository(Prompt)
    private readonly promptRepository: Repository<Prompt>,
  ) {}

  // Create
  async create(createPromptDto: CreatePromptDto): Promise<Prompt> {
    const prompt = this.promptRepository.create(createPromptDto);
    return this.promptRepository.save(prompt);
  }

  // Find all
  async findAll(): Promise<Prompt[]> {
    return this.promptRepository.find();
  }

  // Find one
  async findOne(id: string): Promise<Prompt> {
    const prompt = await this.promptRepository.findOne({ where: { id } });
    if (!prompt) throw new NotFoundException('Prompt not found');
    return prompt;
  }

  // Update
  async update(id: string, updatePromptDto: UpdatePromptDto): Promise<Prompt> {
    const prompt = await this.promptRepository.preload({
      id,
      ...updatePromptDto,
    });
    if (!prompt) throw new NotFoundException('Prompt not found');
    return this.promptRepository.save(prompt);
  }

  // Delete
  async remove(id: string): Promise<void> {
    const result = await this.promptRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException('Prompt not found');
  }

  // Search by tag or tags
  async searchByTags(tags: string[]): Promise<Prompt[]> {
    return this.promptRepository
      .createQueryBuilder('prompt')
      .where('prompt.tags && ARRAY[:...tags]', { tags })
      .getMany();
  }

  // Search by collection
  async searchByCollection(collection: string): Promise<Prompt[]> {
    return this.promptRepository.find({
      where: { collection: ILike(`%${collection}%`) },
    });
  }

  // Search by text in actualPrompt
  async searchByPromptText(query: string): Promise<Prompt[]> {
    return this.promptRepository.find({
      where: { actualPrompt: ILike(`%${query}%`) },
    });
  }

  // Get all unique tags
  async getAllTags(): Promise<string[]> {
    const raw = await this.promptRepository.query(`
      SELECT DISTINCT unnest(tags) as tag FROM prompt
    `);
    return raw.map((r: any) => r.tag);
  }

  // Get all unique collections
  async getAllCollections(): Promise<string[]> {
    const raw = await this.promptRepository
      .createQueryBuilder('prompt')
      .select('DISTINCT prompt.collection', 'collection')
      .getRawMany();

    return raw.map((r) => r.collection);
  }
}
