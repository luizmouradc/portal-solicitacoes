function formatarData(data) {
  if (!data) {
    return "";
  }

  const dataFormatada = new Date(
    data.replace(" ", "T") + "Z"
  );

  return dataFormatada.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export default formatarData;
