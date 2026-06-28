import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function generateCrimeReport(stats: any) {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("CrimeGPT-KA", 14, 20);

    doc.setFontSize(14);
    doc.text("Crime Intelligence Report", 14, 30);

    doc.setFontSize(11);

    doc.text(
        `Generated: ${new Date().toLocaleString()}`,
        14,
        40
    );

    autoTable(doc, {
        startY: 50,
        head: [["Category", "Value"]],
        body: [
            ["Total FIRs", stats.total_firs],
            ["Open Cases", stats.open_cases],
            ["Investigating", stats.investigating],
            ["Closed Cases", stats.closed],
            ["High Priority", stats.high_priority],
            ["Critical Priority", stats.critical_priority],
            ["Districts", stats.districts],
        ],
    });

    doc.save("CrimeGPT_Report.pdf");
}