sap.ui.define([
    "sap/ui/core/Control",
    "sap/m/upload/UploadSet",
    "sap/m/upload/UploadSetItem",
    "sap/m/Label",
    "sap/m/VBox",
    "sap/m/Table",
    "sap/m/Column",
    "sap/m/Text"
], (Control, UploadSet, UploadSetItem, Label, VBox, Table, Column, Text) => {
    "use strict";

    return Control.extend("custom.attachment.control.AttachmentHelper", {
        metadata: {
            properties: {
                documentData: { type: "object" },
                sourceId: { type: "string" },
                sourceFor: { type: "string" }
            },
            aggregations: {
                _container: { type: "sap.ui.core.Control", multiple: false, visibility: "hidden" }
            },
            events: {
                download: {
                    parameters: {
                        documentId: { type: "string" }
                    }
                },
                uploadCompleted: {
                    parameters: {
                        files: { type: "object" }
                    }
                }
            }
        },

        init() {
            const oUploadSet = new UploadSet({
                uploadUrl: "/upload/endpoint", // Replace with actual endpoint
                showIcons: true,
                items: {
                    path: "ModuleMappingMdl>/files",
                    template: new UploadSetItem({
                        fileName: "{ModuleMappingMdl>fileName}",
                        documentId: "{ModuleMappingMdl>id}"
                    })
                },
                uploadCompleted: this._onUploadComplete.bind(this)
            });

            const oVBox = new VBox({
                items: [
                    new Label({ text: "Attachments" }).addStyleClass("sapUiSmallMargin"),
                    oUploadSet
                ]
            });

            this.setAggregation("_container", oVBox);
        },

        _onUploadComplete(oEvent) {
            const uploadedFiles = oEvent.getParameters().files || [];
            this.fireUploadCompleted({ files: uploadedFiles });
        },

        renderer(oRm, oControl) {
            oRm.openStart("div", oControl);
            oRm.class("customAttachmentUploadSet");
            oRm.openEnd();
            oRm.renderControl(oControl.getAggregation("_container"));
            oRm.close("div");
        }
    });
});
