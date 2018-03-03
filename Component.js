sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/odata/v2/ODataModel"
], function (UIComponent, ODataModel) {
	"use strict";

	return UIComponent.extend("leverx.app.Component", {
		metadata: {
			manifest: "json"
		},

		init : function () {
			UIComponent.prototype.init.apply(this, arguments);
			var oODataModel = new ODataModel("http://0.0.0.0:3000/odata/", {
				useBatch: false,
				defaultBindingMode: "TwoWay"
			});
            var mHeaders = oODataModel.getHeaders();
            mHeaders["Access-Control-Allow-Origin"] = "*";
            oODataModel.setHeaders(mHeaders);

			this.setModel(oODataModel, "odata");

			this.getRouter().initialize();
		}
	});
});
