import { getTimeErrorMessage, TimeValidationResult } from '../../utils/timeValidation';

describe('timeValidation', () => {
  /**
   * @description 시작 시간과 종료 시간을 검증하고 오류 메시지를 반환해야 한다.
   */
  describe('getTimeErrorMessage', () => {
    it('시작 시간이 종료 시간보다 빠른 경우 null을 반환해야 한다', () => {
      const result: TimeValidationResult = getTimeErrorMessage('10:00', '11:00');
      expect(result.startTimeError).toBeNull();
      expect(result.endTimeError).toBeNull();
    });

    it('시작 시간이 종료 시간보다 느린 경우 오류 메시지를 반환해야 한다', () => {
      const result: TimeValidationResult = getTimeErrorMessage('12:00', '11:00');
      expect(result.startTimeError).toBe('시작 시간은 종료 시간보다 빨라야 합니다.');
      expect(result.endTimeError).toBe('종료 시간은 시작 시간보다 늦어야 합니다.');
    });

    it('시작 시간과 종료 시간이 같은 경우 오류 메시지를 반환해야 한다', () => {
      const result: TimeValidationResult = getTimeErrorMessage('10:00', '10:00');
      expect(result.startTimeError).toBe('시작 시간은 종료 시간보다 빨라야 합니다.');
      expect(result.endTimeError).toBe('종료 시간은 시작 시간보다 늦어야 합니다.');
    });

    it('시작 시간이나 종료 시간이 비어있는 경우 null을 반환해야 한다', () => {
      expect(getTimeErrorMessage('', '')).toEqual({ startTimeError: null, endTimeError: null });
    });

    it('시작 시간만 비어있는 경우 null을 반환해야 한다', () => {
      expect(getTimeErrorMessage('', '11:00')).toEqual({
        startTimeError: null,
        endTimeError: null,
      });
    });

    it('종료 시간만 비어있는 경우 null을 반환해야 한다', () => {
      expect(getTimeErrorMessage('10:00', '')).toEqual({
        startTimeError: null,
        endTimeError: null,
      });
    });

    it('시작 시간이 종료 시간보다 약간 빠른 경우에도 null을 반환해야 한다', () => {
      const result: TimeValidationResult = getTimeErrorMessage('10:59', '11:00');
      expect(result.startTimeError).toBeNull();
      expect(result.endTimeError).toBeNull();
    });

    it('다양한 시간 형식에 대해서도 정확히 검증해야 한다', () => {
      const result: TimeValidationResult = getTimeErrorMessage('09:30', '17:45');
      expect(result.startTimeError).toBeNull();
      expect(result.endTimeError).toBeNull();
    });

    it('오전/오후가 교차되어도 정확히 검증해야 한다', () => {
      const result: TimeValidationResult = getTimeErrorMessage('09:00', '14:00');
      expect(result.startTimeError).toBeNull();
      expect(result.endTimeError).toBeNull();
    });
  });
});
