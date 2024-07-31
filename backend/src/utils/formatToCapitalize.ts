export const capitalizeMonths = (dateString: string): string => {
  const months: { [key: string]: string } = {
    janeiro: "Janeiro",
    fevereiro: "Fevereiro",
    março: "Março",
    abril: "Abril",
    maio: "Maio",
    junho: "Junho",
    julho: "Julho",
    agosto: "Agosto",
    setembro: "Setembro",
    outubro: "Outubro",
    novembro: "Novembro",
    dezembro: "Dezembro",
  };

  return dateString.replace(
    /\b(janeiro|fevereiro|março|abril|maio|junho|julho|agosto|setembro|outubro|novembro|dezembro)\b/g,
    (match: string) => months[match]
  );
};
