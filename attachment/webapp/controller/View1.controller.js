sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("custom.attachment.controller.View1", {
        onInit() {
            this.getView().setModel(new JSONModel({
                contract: [
                    {
                        name: "Passport"
                    }
                ]
            }), "ModuleMappingMdl");
            this.getView().setModel(new JSONModel({
                id: "1"
            }), "contractModel");
        },
        nUploadFinished(oEvent) {
            const uploadedFiles = oEvent.getParameter("files");
            console.log("Uploaded files:", uploadedFiles);
        },

        onDownload(oEvent) {
            const docId = oEvent.getParameter("documentId");
            // Add logic to handle download
        }
    });
});