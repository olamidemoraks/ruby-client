import { Select, SelectProps, useMantineTheme } from "@mantine/core";

interface SelectFieldProps extends SelectProps {
  data: any[];
  labelName?: string;
  errorMessage?: string;
}
const SelectField = ({
  data,
  errorMessage,
  labelName,
  ...props
}: SelectFieldProps) => {
  const theme = {
    colorScheme: "light",
  };

  return (
    <div className="space-y-3">
      {/* <p className="text-sm">
        {labelName} {props.required && <span className="text-red-500">*</span>}
      </p> */}
      <Select
        searchable
        styles={(u) => ({
          input: {
            background: "transparent",
            border: errorMessage ? "1px solid #EA5455" : "1px solid #6d6d73",
            height: `${48}px`,
            borderRadius: "6px",
            color: theme.colorScheme === "dark" ? "white" : "black",
            textTransform: "capitalize",
          },

          dropdown: {
            background: theme.colorScheme === "dark" ? "#2e2e30" : "white",
            border: theme.colorScheme === "dark" ? "1px solid #6d6d73" : "",
          },
          option: {
            background: theme.colorScheme === "dark" ? "#2e2e30" : "",
            padding: "14px 10px",
            "&:hover": {
              background: theme.colorScheme === "dark" ? "#02B15614" : "",
            },
            textTransform: "capitalize",
            // color: "black",
          },
          label: {
            marginBottom: "7px",
          },
        })}
        data={data}
        {...props}
        checkIconPosition="right"
      />
      {errorMessage && (
        <p className="!mt-1 text-sm text-red-400">{errorMessage}</p>
      )}
    </div>
  );
};

export default SelectField;
