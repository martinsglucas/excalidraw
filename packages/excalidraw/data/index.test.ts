import { vi } from "vitest";
import { exportCanvas, ExportedElements } from "./index";
import { EXPORT_IMAGE_TYPES } from "../constants";
import { FractionalIndex, NonDeletedExcalidrawElement } from "../element/types";
import { Radians } from "../../math";
import { AppState, NormalizedZoomValue } from "../types";

const mockAddImage = vi.fn();
const mockSave = vi.fn();

vi.mock("jspdf", async (importOriginal) => {
  const actual = await importOriginal<typeof import("jspdf")>();
  return {
    ...actual,
    jsPDF: vi.fn().mockImplementation(() => ({
      addImage: mockAddImage,
      save: mockSave,
    })),
  };
});

import jsPDF from "jspdf";

describe("Export Canvas in PDF", () => {
  it("should export canvas", async () => {
    const mockElements: NonDeletedExcalidrawElement[] = [
      {
        "id": "d6RpOEbkfY2nm-ky00-hx",
        "type": "rectangle",
        "x": 554.2000122070312,
        "y": 225.60000610351562,
        "width": 224,
        "height": 146.39999389648438,
        "angle": 0 as Radians,
        "strokeColor": "#1e1e1e",
        "backgroundColor": "transparent",
        "fillStyle": "solid",
        "strokeWidth": 2,
        "strokeStyle": "solid",
        "roughness": 1,
        "opacity": 100,
        "groupIds": [],
        "frameId": null,
        "index": "a0" as FractionalIndex,
        "roundness": {
            "type": 3
        },
        "seed": 1030290586,
        "version": 15,
        "versionNonce": 825873606,
        "isDeleted": false,
        "boundElements": [],
        "updated": 1737831579300,
        "link": null,
        "locked": false
    },
    ];
    const exportedElements = mockElements as unknown as ExportedElements;
    const mockAppState: AppState = {
      "showWelcomeScreen": true,
      "theme": "light",
      "collaborators": new Map(),
      "currentChartType": "bar",
      "currentItemBackgroundColor": "transparent",
      "currentItemEndArrowhead": "arrow",
      "currentItemFillStyle": "solid",
      "currentItemFontFamily": 5,
      "currentItemFontSize": 20,
      "currentItemOpacity": 100,
      "currentItemRoughness": 1,
      "currentItemStartArrowhead": null,
        "currentItemStrokeColor": "#1e1e1e",
        "currentItemRoundness": "round",
        "currentItemArrowType": "round",
        "currentItemStrokeStyle": "solid",
        "currentItemStrokeWidth": 2,
        "currentItemTextAlign": "left",
        "currentHoveredFontFamily": null,
        "cursorButton": "up",
        "activeEmbeddable": null,
        "newElement": null,
        "editingTextElement": null,
        "editingGroupId": null,
        "editingLinearElement": null,
        "activeTool": {
          "type": "selection",
          "customType": null,
          "locked": false,
          "lastActiveTool": null
        },
        "penMode": false,
        "penDetected": false,
        "errorMessage": null,
        "exportBackground": true,
        "exportScale": 1,
        "exportEmbedScene": false,
        "exportWithDarkMode": false,
        "fileHandle": null,
        "gridSize": 20,
        "gridStep": 5,
        "gridModeEnabled": false,
        "isBindingEnabled": true,
        "defaultSidebarDockedPreference": false,
        "isLoading": false,
        "isResizing": false,
        "isRotating": false,
        "lastPointerDownWith": "mouse",
        "multiElement": null,
        "name": "Sem título-2024-11-14-2327",
        "contextMenu": null,
        "openMenu": null,
        "openPopup": null,
        "openSidebar": null,
        "openDialog": {
          "name": "imageExport"
      },
      "pasteDialog": {
        "shown": false,
        "data": null
      },
      "previousSelectedElementIds": {},
      "resizingElement": null,
      "scrolledOutside": false,
      "scrollX": 14.113344160994028,
      "scrollY": 59.01436495780581,
      "selectedElementIds": {},
      "hoveredElementIds": {},
      "selectedGroupIds": {},
      "selectedElementsAreBeingDragged": false,
      "selectionElement": null,
      "shouldCacheIgnoreZoom": false,
      "stats": {
        "open": false,
        "panels": 3
      },
      "startBoundElement": null,
      "suggestedBindings": [],
      "frameRendering": {
        "enabled": true,
        "clip": true,
        "name": true,
        "outline": true
      },
      "frameToHighlight": null,
      "editingFrame": null,
      "elementsToHighlight": null,
      "toast": null,
      "viewBackgroundColor": "#ffffff",
      "zenModeEnabled": false,
      "zoom": {
        "value": 0.857527 as NormalizedZoomValue
      },
      "viewModeEnabled": false,
      "pendingImageElementId": null,
      "showHyperlinkPopup": false,
      "selectedLinearElement": null,
      "snapLines": [],
      "originSnapOffset": {
        "x": 0,
        "y": 0
      },
      "objectsSnapModeEnabled": false,
      "userToFollow": null,
      "followedBy": new Set(),
      "isCropping": false,
      "croppingElementId": null,
      "searchMatches": [],
      "offsetLeft": 0,
      "offsetTop": 0,
      "width": 1100,
      "height": 695.2000122070312
    };
    const mockFiles = {};

    await expect(
      exportCanvas(EXPORT_IMAGE_TYPES.pdf, exportedElements, mockAppState, mockFiles, {
        exportBackground: true,
        viewBackgroundColor: "#FFFFFF",
        exportingFrame: null,
      },),
    ).resolves.not.toThrow();
    expect(mockAddImage).toHaveBeenCalled();
    expect(mockSave).toHaveBeenCalled();
  });
});