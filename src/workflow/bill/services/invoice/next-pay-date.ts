import { Period } from 'bill'
import dayjs from 'dayjs'

interface Props {
  period: Period
}

export const getNextPayDate = ({ period }: Props) => {
  const today = dayjs(new Date())

  if (period === 'week') {
    return today.add(7, 'day').format('YYYY-MM-DDTHH:mm:ssZ[Z]')
  }

  if (period === 'month') {
    return today.add(1, 'month').format('YYYY-MM-DDTHH:mm:ssZ[Z]')
  }

  return today.add(1, 'year').format('YYYY-MM-DDTHH:mm:ssZ[Z]')
}
