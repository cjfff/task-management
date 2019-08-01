import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs'

const FORMAT_DATE_TYPE: string = 'yyyy-MM-dd hh:mm:ss'


@Injectable()
export class DateUtil {
  format(date: Date = new Date()) {
    console.log(dayjs, 'dayjsdayjsdayjsdayjsdayjsdayjsdayjsdayjs')
    return dayjs(date).format(FORMAT_DATE_TYPE)
  }
}