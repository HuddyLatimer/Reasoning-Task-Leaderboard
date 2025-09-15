from typing import Dict, Any, List, Union
import numpy as np

def evaluate_outputs(outputs: Dict[str, Any], dataset: str) -> float:
    if dataset == "math":
        return evaluate_math(outputs)
    elif dataset == "logic":
        return evaluate_logic(outputs)
    elif dataset == "cs":
        return evaluate_cs(outputs)
    else:
        raise ValueError(f"Unknown dataset: {dataset}")

def evaluate_math(outputs: Dict[str, Any]) -> float:
    correct = 0
    total = len(outputs)
    
    for question_id, submission in outputs.items():
        expected = get_expected_answer(question_id)
        if isinstance(expected, (int, float)):
            # For numerical answers, allow small differences
            if isinstance(submission, (int, float)):
                if abs(float(submission) - float(expected)) < 1e-6:
                    correct += 1
        else:
            # For text answers, compare normalized strings
            if str(submission).strip().lower() == str(expected).strip().lower():
                correct += 1
    
    return correct / total if total > 0 else 0.0

def evaluate_logic(outputs: Dict[str, Any]) -> float:
    correct = 0
    total = len(outputs)
    
    for question_id, submission in outputs.items():
        expected = get_expected_answer(question_id)
        # For logic questions, compare boolean values or normalized strings
        if isinstance(expected, bool):
            if isinstance(submission, bool) and submission == expected:
                correct += 1
        else:
            if str(submission).strip().lower() == str(expected).strip().lower():
                correct += 1
    
    return correct / total if total > 0 else 0.0

def evaluate_cs(outputs: Dict[str, Any]) -> float:
    correct = 0
    total = len(outputs)
    
    for question_id, submission in outputs.items():
        expected = get_expected_answer(question_id)
        # For CS questions, compare function outputs or normalized strings
        if isinstance(expected, (list, dict)):
            if submission == expected:
                correct += 1
        else:
            if str(submission).strip().lower() == str(expected).strip().lower():
                correct += 1
    
    return correct / total if total > 0 else 0.0

def get_expected_answer(question_id: str) -> Union[int, float, bool, str, List, Dict]:
    # TODO: Implement actual answer lookup from a database or file
    # For now, return dummy data for testing
    return {
        "math_1": 42,
        "math_2": 3.14159,
        "logic_1": True,
        "logic_2": "valid",
        "cs_1": ["sort", "merge", "quick"],
        "cs_2": {"time": "O(n)", "space": "O(1)"}
    }.get(question_id, "")
