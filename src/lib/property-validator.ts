/**
 *  These functions could be used in the rule definitions.
 *
 * @export
 * @class PropertyValidator
 */
export class PropertyValidator {

  min(value: number, limit: number) {
    return value >= limit;
  }
  max(value: number, limit: number) {
    return value <= limit;
  }
  minDate(value: string, limit: string) {
    const valueDate = Date.parse(value);
    const limitDate = Date.parse(limit);
    return valueDate >= limitDate;
  }
  maxDate(value: string, limit: string) {
    const valueDate = Date.parse(value);
    const limitDate = Date.parse(limit);
    return valueDate <= limitDate;
  }
  equals(value: string, ruleValue: string) {
    return value === ruleValue;
  }
  contains(value: string, ruleValue: string) {
    return value.indexOf(ruleValue) > -1;
  }
  startsWith(value: string, ruleValue: string) {
    return value.indexOf(ruleValue) === 0;
  }

}
