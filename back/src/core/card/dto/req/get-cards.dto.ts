import {
  IsOptional,
} from 'class-validator';

import { IPagination } from "../../interfaces/IPagination";

class ReqGetCardsDto implements IPagination {
  @IsOptional()
  public readonly limit?: string;

  @IsOptional()
  public readonly page?: string;

}

export default ReqGetCardsDto;
