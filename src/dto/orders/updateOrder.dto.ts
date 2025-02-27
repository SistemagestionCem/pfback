

import { IsEnum, IsOptional, IsString, IsNumber, IsEmail, IsBoolean, IsDateString } from 'class-validator';
import { EquipmentType } from '../../enum/equipmentype.enum';
import { OrderStatus } from '../../enum/orderstatus.enum';

export class UpdateOrderDto {

  @IsOptional ()
  @IsEmail ()
  clientEmail?: string;

  @IsOptional ()
  @IsNumber ()
  clientDni?: number;
  
  @IsOptional ()
  @IsString ()
  technName?: string;

  @IsOptional ()
  @IsEnum (EquipmentType)
  equipmentType?: EquipmentType;

  @IsOptional ()
  @IsString ()
  imei?: string;

  @IsOptional ()
  @IsString ()
  description?: string;

  @IsOptional ()
  @IsEnum (OrderStatus)
  status?: OrderStatus;

  @IsOptional ()
  @IsBoolean ()
  isActive?: boolean;

  @IsOptional()
  @IsDateString()
  readonly createdAt?: Date;

  @IsOptional ()
  @IsString ()
  adminName?: string;

}


