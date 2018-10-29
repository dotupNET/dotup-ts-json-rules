import { RuleSet } from './rule-set';
import { PropertyValidator } from './property-validator';

export class JsonRules {

  constructor() { }

  IsValid(source: any, ruleSet: RuleSet): boolean {
    if (this.ShouldValidateRule(source, ruleSet)) {
      if (this.RuleMatches(source, ruleSet.rules)) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  ShouldValidateRule(source: any, ruleSet: RuleSet) {
    const ruleSetKey = 'selectors';

    if (ruleSet.selectors === undefined || ruleSet.selectors === null){
      // No selector is set, apply all rules
      return true;
    }

    const ruleSetSelectors : any = ruleSet.selectors;

    for (const ruleSetSelector in ruleSetSelectors) {
      if (!ruleSetSelectors.hasOwnProperty(ruleSetSelector)) {
        continue;
      }
      console.log(`selector: ${ruleSetSelector}`);
      const propSource = source[ruleSetSelector];
      const conditions = ruleSetSelectors[ruleSetSelector];
      const match = this.SelectorMatches(propSource, conditions);
      if (match === false) {
        return false;
      }
    }
    return true;
  }

  SelectorMatches(values: any, rule: any) {
    const result = true;
    const validator = <any>new PropertyValidator();
    for (const key in rule) {
      if (rule.hasOwnProperty(key)) {
        const ruleValues = rule[key];
        if (values.hasOwnProperty(key)) {
          console.log(values[key]);
          for (const validatorName in ruleValues) {
            if (!ruleValues.hasOwnProperty(validatorName)) {
              continue;
            }
            const isValid = validator[validatorName](values[key], ruleValues[validatorName]);
            if (isValid === false) {
              return false;
            }
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return result;
  }

  RuleMatches(values: any, rule: any): boolean {
    const result = true;
    const validator = <any>new PropertyValidator();

    for (const key in rule) {
      if (!rule.hasOwnProperty(key)) {
        continue;
      }
      console.log(`validating ${key}`);
      if (!rule.hasOwnProperty(key)) {
        return false;
      }

      if (!values.hasOwnProperty(key)) {
        return false;
      }

      let ruleValues = rule[key];
      console.log(values[key]);

      // this rule has a selector
      if (ruleValues.hasOwnProperty('selector')) {
        const selectorValue = ruleValues['selector'];
        if (ruleValues[values[selectorValue]]) {
          ruleValues = ruleValues[values[selectorValue]];
        } else {
          // This rule doesnt belongs to this property
          return true;
        }
      }

      if (typeof (ruleValues) !== 'object') {
        throw new Error(`Wrong Rule configuration for ${key} - no validator found`);
      }

      for (const validatorName in ruleValues) {
        if (validator[validatorName]) {
          const isValid = validator[validatorName](values[key], ruleValues[validatorName]);
          if (isValid === false) {
            return false;
          }
        } else {
          const isValid = this.RuleMatches(values[key], ruleValues);
          if (isValid === false) {
            return false;
          }
          break;
        }
      }

    }
    return result;
  }
}
