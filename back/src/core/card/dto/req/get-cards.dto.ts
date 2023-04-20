import {
  IsInt,
  IsOptional,
} from 'class-validator';

import { IPagination } from "../../interfaces/IPagination";

class ReqGetCardsDto implements IPagination {
  @IsInt()
  @IsOptional()
  public readonly limit?: number;

  @IsInt()
  @IsOptional()
  public readonly page?: number;

}

export default ReqGetCardsDto;
