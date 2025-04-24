import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { QuestionType } from "../../types";

interface QuestionItemProps {
  index: number;
  title: string;
  type: QuestionType;
  options?: string[];
  value: string;
  onChange: (value: string) => void;
  isSubmitted?: boolean;
  isCorrect?: boolean;
  disabled?: boolean;
}

export const QuestionItem = ({
  index,
  title,
  type,
  options = [],
  value,
  onChange,
  isSubmitted = false,
  isCorrect = false,
  disabled = false,
}: QuestionItemProps) => {
  const getBackgroundColor = () => {
    if (!isSubmitted) return "transparent";
    return isCorrect ? "#e6f4ea" : "#fbeaea";
  };

  return (
    <Box
      mb={4}
      p={2}
      borderRadius={2}
      sx={{ backgroundColor: getBackgroundColor() }}
    >
      <Typography variant="h6" gutterBottom>
        {index + 1}. {title}
      </Typography>

      {type === "TrueFalse" && (
        <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
          <FormControlLabel
            value="true"
            control={<Radio disabled={disabled} />}
            label="True"
          />
          <FormControlLabel
            value="false"
            control={<Radio disabled={disabled} />}
            label="False"
          />
        </RadioGroup>
      )}

      {type === "MultipleChoice" && (
        <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((opt, i) => (
            <FormControlLabel
              key={i}
              value={opt}
              control={<Radio disabled={disabled} />}
              label={opt}
            />
          ))}
        </RadioGroup>
      )}

      {type === "ShortAnswer" && (
        <TextField
          label="Your Answer"
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      )}
    </Box>
  );
};
