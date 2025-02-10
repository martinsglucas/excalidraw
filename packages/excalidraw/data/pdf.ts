import { jsPDF } from "jspdf";
import { exportToCanvas } from "../scene/export";
import { ExcalidrawFrameLikeElement, NonDeletedExcalidrawElement } from "../element/types";
import { AppState, BinaryFiles } from "../types";

export const exportCanvasToPdf = async (
  elements: readonly NonDeletedExcalidrawElement[],
  appState: AppState,
  files: BinaryFiles,
  options: {
    exportBackground: boolean;
    viewBackgroundColor: string;
    exportingFrame?: ExcalidrawFrameLikeElement | null;
  },
) => {
  if (elements.length === 0) {
    throw new Error("It is not possible to export an empty canvas to PDF.");
  }

  // Generate the canvas with the elements
  const canvas = await exportToCanvas(elements, appState, files, options);

  const imageData = canvas.toDataURL("image/png", 1.0);

  // Create a PDF document
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? "landscape" : "portrait",
    unit: "px",
    format: [canvas.width, canvas.height],
  });

  pdf.addImage(imageData, "PNG", 0, 0, canvas.width, canvas.height);
  pdf.save(`${appState.name || "export"}.pdf`);
};
