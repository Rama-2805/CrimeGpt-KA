export function exportCSV(data: any[]) {

    if (!data || data.length === 0) {
        alert("No data available.");
        return;
    }

    const headers = Object.keys(data[0]);

    const csv = [
        headers.join(","),
        ...data.map((row) =>
            headers
                .map((field) => `"${row[field] ?? ""}"`)
                .join(",")
        ),
    ].join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "CrimeGPT_Report.csv";

    link.click();

    URL.revokeObjectURL(url);
}