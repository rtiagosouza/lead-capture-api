import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Lead } from './entities/lead.entity';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';

@Injectable()
export class LeadsService {
  constructor(
    @InjectRepository(Lead)
    private leadRepository: Repository<Lead>,
  ) { }

  async create(createLeadDto: CreateLeadDto): Promise<Lead> {

    const nameParts = createLeadDto.name.trim().split(' ');
    if (nameParts.length < 2) {
      throw new BadRequestException('O nome completo deve conter nome e sobrenome');
    }

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(createLeadDto.email)) {
      throw new BadRequestException('Email inválido');
    }


    const existingLead = await this.findByEmail(createLeadDto.email);
    if (existingLead) {
      return existingLead;
    }


    const lead = new Lead();
    lead.firstName = firstName;
    lead.lastName = lastName;
    lead.email = createLeadDto.email;
    lead.phone = createLeadDto.phone || null;
    lead.ip = createLeadDto.ip;
    lead.utmSource = createLeadDto.utmSource || null;
    lead.utmMedium = createLeadDto.utmMedium || null;
    lead.utmCampaign = createLeadDto.utmCampaign || null;
    lead.utmContent = createLeadDto.utmContent || null;

    return this.leadRepository.save(lead);
  }

  async findAll(): Promise<Lead[]> {
    return this.leadRepository.find();
  }

  async findOne(id: string): Promise<Lead> {
    const lead = await this.leadRepository.findOne({ where: { id } });
    if (!lead) {
      throw new NotFoundException(`Lead com ID ${id} não encontrado`);
    }
    return lead;
  }

  async findByEmail(email: string): Promise<Lead | null> {
    return this.leadRepository.findOne({ where: { email } });
  }

  async update(id: string, updateLeadDto: UpdateLeadDto): Promise<Lead> {
    const lead = await this.findOne(id);


    if (updateLeadDto.name) {
      const nameParts = updateLeadDto.name.trim().split(' ');
      if (nameParts.length < 2) {
        throw new BadRequestException('O nome completo deve conter nome e sobrenome');
      }

      lead.firstName = nameParts[0];
      lead.lastName = nameParts.slice(1).join(' ');
    }


    if (updateLeadDto.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateLeadDto.email)) {
        throw new BadRequestException('Email inválido');
      }


      const existingLead = await this.findByEmail(updateLeadDto.email);
      if (existingLead && existingLead.id !== id) {
        throw new BadRequestException('Este email já está cadastrado para outro lead');
      }

      lead.email = updateLeadDto.email;
    }

    if (updateLeadDto.ip) lead.ip = updateLeadDto.ip;


    lead.phone = updateLeadDto.phone !== undefined ? updateLeadDto.phone || null : lead.phone;
    lead.utmSource = updateLeadDto.utmSource !== undefined ? updateLeadDto.utmSource || null : lead.utmSource;
    lead.utmMedium = updateLeadDto.utmMedium !== undefined ? updateLeadDto.utmMedium || null : lead.utmMedium;
    lead.utmCampaign = updateLeadDto.utmCampaign !== undefined ? updateLeadDto.utmCampaign || null : lead.utmCampaign;
    lead.utmContent = updateLeadDto.utmContent !== undefined ? updateLeadDto.utmContent || null : lead.utmContent;

    return this.leadRepository.save(lead);
  }

  async remove(id: string): Promise<void> {
    const lead = await this.findOne(id);
    await this.leadRepository.remove(lead);
  }
}
