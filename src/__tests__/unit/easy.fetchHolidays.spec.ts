import { fetchHolidays } from '../../apis/fetchHolidays';

describe('fetchHolidays API', () => {
  it('2025년 1월의 공휴일을 정확히 반환해야 한다', () => {
    const date = new Date(2025, 0, 15);
    const holidays = fetchHolidays(date);
    expect(holidays).toEqual({
      '2025-01-01': '신정',
      '2025-01-29': '설날',
      '2025-01-30': '설날',
      '2025-01-31': '설날',
    });
  });

  it('2025년 5월의 공휴일을 정확히 반환해야 한다', () => {
    const date = new Date(2025, 4, 15);
    const holidays = fetchHolidays(date);
    expect(holidays).toEqual({
      '2025-05-05': '어린이날',
    });
  });

  it('2025년 10월의 공휴일을 정확히 반환해야 한다', () => {
    const date = new Date(2025, 9, 15);
    const holidays = fetchHolidays(date);
    expect(holidays).toEqual({
      '2025-10-03': '개천절',
      '2025-10-05': '추석',
      '2025-10-06': '추석',
      '2025-10-07': '추석',
      '2025-10-09': '한글날',
    });
  });

  it('2025년 12월의 공휴일을 정확히 반환해야 한다', () => {
    const date = new Date(2025, 11, 15);
    const holidays = fetchHolidays(date);
    expect(holidays).toEqual({
      '2025-12-25': '크리스마스',
    });
  });

  it('공휴일이 없는 달은 빈 객체를 반환해야 한다', () => {
    const date = new Date(2025, 1, 15);
    const holidays = fetchHolidays(date);
    expect(holidays).toEqual({});
  });

  it('월과 일이 한 자리 수인 경우에도 올바르게 반환해야 한다', () => {
    const date = new Date(2025, 4, 5);
    const holidays = fetchHolidays(date);
    expect(holidays).toEqual({
      '2025-05-05': '어린이날',
    });
  });

  it('연도가 다른 공휴일은 포함되지 않아야 한다', () => {
    const date = new Date(2024, 0, 15);
    const holidays = fetchHolidays(date);
    expect(holidays).toEqual({});
  });
});
