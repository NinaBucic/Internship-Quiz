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
}

export const QuestionItem = ({
  index,
  title,
  type,
  options = [],
  value,
  onChange,
}: QuestionItemProps) => {
  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>
        {index + 1}. {title}
      </Typography>

      {type === "TrueFalse" && (
        <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
          <FormControlLabel value="true" control={<Radio />} label="True" />
          <FormControlLabel value="false" control={<Radio />} label="False" />
        </RadioGroup>
      )}

      {type === "MultipleChoice" && (
        <RadioGroup value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((opt, i) => (
            <FormControlLabel
              key={i}
              value={opt}
              control={<Radio />}
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
        />
      )}
    </Box>
  );
};
