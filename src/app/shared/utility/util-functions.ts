export async function copyToClipboard(copyValue: string): Promise<void> {
  navigator.clipboard.writeText(copyValue).then(
    () => {},
    err => {
      console.error('Failed to copy text: ', err);
    }
  );
}

export function setSelectedColumns(columnData: any[]): any[] {
  return columnData.filter(column => column.is_selected === true);
}

export function groupItemsByCurrency(items: any[]): any[] {
  const groupedItems: { [currency: string]: any[] } = {};
  items.forEach(item => {
    const currency = item.currency;
    if (!groupedItems[currency]) {
      groupedItems[currency] = [];
    }
    groupedItems[currency].push(item);
  });

  return Object.keys(groupedItems).map(currency => ({
    currencyType: currency,
    items: groupedItems[currency],
  }));
}
