

/*import { IsNotEmpty, IsEnum, IsString, IsEmail, IsNumber } from 'class-validator';
import { EquipmentType } from '../../enum/equipmentype.enum';
import { OrderStatus } from '../../enum/orderstatus.enum';

export class CreateOrderDto {

  @IsNotEmpty ()
  @IsEmail ()
  clientEmail: string;

  @IsNotEmpty ()
  @IsNumber ()
  clientDni: number;

  @IsNotEmpty ()
  @IsString ()
  technName: string; 

  @IsNotEmpty ()
  @IsEnum (EquipmentType)
  equipmentType: EquipmentType;

  @IsNotEmpty ()
  @IsString ()
  imei: string;

  @IsNotEmpty ()
  @IsString ()
  description: string;

  @IsNotEmpty ()
  @IsEnum (OrderStatus)
  status: OrderStatus;  

  @IsNotEmpty ()
  @IsString ()
  adminName: string; 

}*/

/**********/

import { IsNotEmpty, IsEnum, IsString, IsEmail, IsNumber } from 'class-validator';
import { EquipmentType } from '../../enum/equipmentype.enum';
import { OrderStatus } from '../../enum/orderstatus.enum';

export class CreateOrderDto {

  @IsNotEmpty ()
  @IsEmail ()
  clientEmail: string;

  @IsNotEmpty ()
  @IsNumber ()
  clientDni: number;

  @IsNotEmpty ()
  @IsString ()
  technId: string; 

  @IsNotEmpty ()
  @IsEnum (EquipmentType)
  equipmentType: EquipmentType;

  @IsNotEmpty ()
  @IsString ()
  imei: string;

  @IsNotEmpty ()
  @IsString ()
  description: string;

  @IsNotEmpty ()
  @IsEnum (OrderStatus)
  status: OrderStatus;  

  @IsNotEmpty ()
  @IsString ()
  adminId: string; 

}

/**********/

