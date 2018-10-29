import { JsonRules } from './json-rules';
import { RuleSet } from './rule-set';

const source: any = {
  Driver: {
    Age: 45,
    Gender: 1,
    Name: "Peter",
    Whatever: "Oha"
  },
  Bike: {
    Ccm: 250,
    Strokes: 2,
    Cylinder: 1,
    YOM: "1979-01-02"
  }
};

describe('JsonRules', () => {

  it('should create an instance', () => {
    const value = new JsonRules();
    expect(value).toBeTruthy();
  });

  it('should be valid without selectors', () => {
    const value = new JsonRules();

    const ruleSet: RuleSet =
    {
      rules: {
        "Driver": {
          "Age": {
            "1": { "min": 40, "max": 999 },
            "2": { "min": 50, "max": 999 },
            "selector": "Gender"
          }
        }
      }
    };

    const result = value.IsValid(source, ruleSet);
    expect(result).toBeTruthy();
  });

  it('should be valid with selectors', () => {
    const value = new JsonRules();

    const ruleSet: RuleSet =
    {
      selectors: {
        "Driver": {
          "Name": {
            "equals": "Peter"
          }
        }
      },
      rules: {
        "Driver": {
          "Age": {
            "1": { "min": 40, "max": 999 },
            "2": { "min": 50, "max": 999 },
            "selector": "Gender"
          }
        }
      }
    };

    const result = value.IsValid(source, ruleSet);
    expect(result).toBeTruthy();
  });

  it('should be invalid without selectors', () => {
    const value = new JsonRules();

    const ruleSet: RuleSet =
    {
      rules: {
        "Driver": {
          "Age": {
            "1": { "min": 20, "max": 30 },
            "2": { "min": 1, "max": 999 },
            "selector": "Gender"
          }
        }
      }
    };

    const result = value.IsValid(source, ruleSet);
    expect(result).toBeFalsy();
  });

  it('should be invalid with selectors', () => {
    const value = new JsonRules();

    const ruleSet: RuleSet =
    {
      selectors: {
        "Driver": {
          "Whatever": {
            "equals": "Oha"
          }
        }
      },
      rules: {
        "Driver": {
          "Age": {
            "1": { "min": 20, "max": 30 },
            "2": { "min": 1, "max": 999 },
            "selector": "Gender"
          }
        }
      }
    };

    const result = value.IsValid(source, ruleSet);
    expect(result).toBeFalsy();
  });

  it('should validate rule without selector', () => {
    const value = new JsonRules();

    const ruleSet: RuleSet =
    {
      rules: {
        "Driver": {
          "Age": {
            "1": { "min": 20, "max": 30 },
            "2": { "min": 1, "max": 999 },
            "selector": "Gender"
          }
        }
      }
    };

    const result = value.ShouldValidateRule(source, ruleSet);
    expect(result).toBeTruthy();
  });

  it('should validate rule with selector', () => {
    const value = new JsonRules();

    const ruleSet: RuleSet =
    {
      selectors: {
        "Driver": {
          "Name": {
            "equals": "Peter"
          }
        }
      },
      rules: {
        "Driver": {
          "Age": {
            "1": { "min": 20, "max": 30 },
            "2": { "min": 1, "max": 999 },
            "selector": "Gender"
          }
        }
      }
    };

    const result = value.ShouldValidateRule(source, ruleSet);
    expect(result).toBeTruthy();
  });

  it('should not validate rule with selector', () => {
    const value = new JsonRules();

    const ruleSet: RuleSet =
    {
      selectors: {
        "Driver": {
          "Whatever": {
            "equals": "Wow"
          }
        }
      },
      rules: {
        "Driver": {
          "Age": {
            "1": { "min": 20, "max": 30 },
            "2": { "min": 1, "max": 999 },
            "selector": "Gender"
          }
        }
      }
    };

    const result = value.ShouldValidateRule(source, ruleSet);
    expect(result).toBeFalsy();
  });

});

