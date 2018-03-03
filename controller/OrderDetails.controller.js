sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast",
	"sap/m/MessageBox"
], function (Controller, JSONModel, History, MessageToast, MessageBox) {
	"use strict";
	var sOrderIdPath;
	var sObjectId;
	return Controller.extend("leverx.app.controller.OrderDetails", {
		onInit: function () {
				var oComponent = this.getOwnerComponent();
				var oRouter = oComponent.getRouter();
				oRouter.getRoute("orderDetails").attachPatternMatched(this.onPatternMatched, this);

				var oProduct = new JSONModel({
					name:"Orarge",
					price: "13",
			    currency: "EUR",
			    quantity: "2",
			    totalPrice: "26"
				});
				this.getView().setModel(oProduct, "oProduct")
			},
			onPatternMatched: function (oEvent) {
				var that = this;
				var mRouteArguments = oEvent.getParameter("arguments");
				sObjectId = mRouteArguments.objectId;

				var oODataModel = this.getView().getModel("odata");
				oODataModel.metadataLoaded().then(function () {
					var sKey = oODataModel.createKey("/Orders", {id: sObjectId});
					sOrderIdPath = sKey;
					that.getView().bindObject({
						path: sKey,
						model: "odata"
					});
				});
			},
			onDeleteProductPress: function (oEvent) {
				var oCtx = oEvent.getSource().getBindingContext("odata");
				var oODataModel = oCtx.getModel();
				var sKey = oODataModel.createKey("/OrderProducts", oCtx.getObject());
				oODataModel.remove(sKey, {
					success: function () {
						MessageToast.show("Product was successfully removed!")
					},
					error: function () {
						MessageBox.error("Error while removing product!");
					}
				});
			},
			onUpdateOrderPress: function (oEvent) {
				var oCtx = oEvent.getSource().getBindingContext("odata");
				var oODataModel = oCtx.getModel();
				var sKey = oODataModel.createKey("/Orders", oCtx.getObject());
				var oView = this.getView();
				if (!this.oDialog) {
					this.oDialog = sap.ui.xmlfragment(oView.getId(), "leverx.app.view.fragments.UpdateOrder", this);
					oView.addDependent(this.oDialog);
				}
				this.oDialog.bindObject({
					path: sKey,
					model: "odata"
				});
				this.oDialog.open();

			},
			onProductSendUpdatePress:function (oEvent) {
				// get binding context of the table row, which the button belongs to
				var oCtx = oEvent.getSource().getBindingContext("odata");

				// get the ODataModel instance through the context
				var oODataModel = oCtx.getModel();

				// retrieve a key of the entry to be updated
				var sKey = oODataModel.createKey("/Orders", oCtx.getObject());

				// construct payload (the object that contains brand-new properties for the entry to be updated
				// jQuery.extend is used here to make a deep-copy of and object
				var mPayload = jQuery.extend(true, {}, oCtx.getObject());

				oODataModel.update(sKey, mPayload, {
					success: function () {
						MessageToast.show("Supplier was successfully updated!")
					},
					error: function () {
						MessageBox.error("Error while updating supplier!");
					}
				});
			},
			onUpdateOrderCustomerPress:function (oEvent) {
				var oCtx = oEvent.getSource().getBindingContext("odata");
				var oODataModel = oCtx.getModel();
				var sKey = oODataModel.createKey("/Orders", oCtx.getObject());
				var oView = this.getView();
				if (!this.oDialog) {
					this.oDialog = sap.ui.xmlfragment(oView.getId(), "leverx.app.view.fragments.UpdateOrderCustomer", this);
					oView.addDependent(this.oDialog);
				}
				this.oDialog.bindObject({
					path: sKey,
					model: "odata"
				});
				this.oDialog.open();
			},
			onProductSendUpdateCutomerPress:function (oEvent) {
				var oCtx = oEvent.getSource().getBindingContext("odata");

				var oODataModel = oCtx.getModel();

				var sKey = oODataModel.createKey("/Orders", oCtx.getObject());

				var mPayload = jQuery.extend(true, {}, oCtx.getObject());

				oODataModel.update(sKey, mPayload, {
					success: function () {
						MessageToast.show("Supplier was successfully updated!")
					},
					error: function () {
						MessageBox.error("Error while updating supplier!");
					}
				});
			},
			onAddProductPress:function () {
				var oView = this.getView();
				if (!this.oDialog) {
					this.oDialog = sap.ui.xmlfragment(oView.getId(), "leverx.app.view.fragments.AddProductDialog", this);
					oView.addDependent(this.oDialog);
				}
				this.oDialog.bindObject({
					path: sOrderIdPath,
					model: "odata"
				});
				this.oDialog.open();
			},
			onCloseDialogPress: function () {
				this.oDialog.close();
			},
			onSendProductPress: function () {
				var oModele = this.getView().getModel("oProduct").getData();

				oModele.orderId = sObjectId;

				var oODataModel = this.getView().getModel("odata");

				oODataModel.create(`/OrderProducts`, oModele, {
					success: function () {
						MessageToast.show("Product was successfully added!")
					},
					error: function () {
						MessageBox.error("Error while creating product!");
					}
				});
			},
			getRouter: function() {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},
			onProductPress: function (oEvent) {
				this._showObject(oEvent.getSource());
			},
			_showObject: function(oItem) {
				this.getRouter().navTo("productDetails", {
					productId: oItem.getBindingContext("odata").getProperty("id")
				});
			},
			onNavBack: function () {
				var oHistory = History.getInstance();
				var sPreviousHash = oHistory.getPreviousHash();

				if (sPreviousHash !== undefined) {
					window.history.go(-1);
				} else {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("OrdersOverview", {}, true);
				}
			}
	});
});
