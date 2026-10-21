export default function Table({
  className,
  children,
}: React.ComponentProps<"table">) {
  return (
    <table className={`border-spacing-0 border-separate  ${className}`}>
      {children}
    </table>
  );
}

Table.TR = function ({ className, children }: React.ComponentProps<"tr">) {
  return <tr className={` bg-(image:--stats-table-bg) ${className}`}>{children}</tr>;
};

Table.TH = function ({ className, children }: React.ComponentProps<"th">) {
  return (
    <th
      className={`p-[0.2rem] border-b border-(--table-border-color) bg-(--table-th-bg-color) ${className}`}
    >
      {children}
    </th>
  );
};

type TDProps = React.ComponentProps<"td"> & { center?: boolean };

Table.TD = function ({
  center = false,
  className,
  children,
  ...props
}: TDProps) {
  const textCenter = center ? "text-center" : "";
  return (
    <td
      {...props}
      className={`p-[0.2rem] border-b border-(--table-border-color) ${textCenter} ${className}`}
    >
      {children}
    </td>
  );
};
