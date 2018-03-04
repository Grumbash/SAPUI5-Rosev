sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel",
		"sap/m/MessageToast",
		"sap/m/MessageBox",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator"
	], function (Controller, JSONModel, MessageToast, MessageBox, Filter, FilterOperator) {
		"use strict";

		return Controller.extend("leverx.app.controller.OrdersOverview", {
			onInit: function () {
				var oAppViewModel = new JSONModel({
					productsCount: 0
				});
				var oNow = new Date().toISOString();
				var oOrderModel = new JSONModel({
					summary:{
						createdAt: oNow,
						customer: "",
						status: "Pending",
						shippedAt: oNow,
						totalPrice: "",
						currency: "EUR"
					},
					shipTo: {
						name: "",
						address: "",
			      ZIP: "",
			      region: "",
			      country: ""
					},
					customerInfo: {
						firstName: "",
			      lastName: "",
			      address: "",
			      phone: "",
			      email: ""
					},
				});

				this.oAppViewModel = oAppViewModel;

				this.getView().setModel(oAppViewModel, "appView");

				this.getView().setModel(oOrderModel, "oOrderView");
			},
			getRouter: function() {
				return sap.ui.core.UIComponent.getRouterFor(this);
			},
			onOrderPress: function (oEvent) {
				this._showObject(oEvent.getSource());
			},
			_showObject: function(oItem) {
				this.getRouter().navTo("orderDetails", {
					objectId: oItem.getBindingContext("odata").getProperty("id")
				});
			},
			onDeleteOrderPress: function (oEvent) {
				var oCtx = oEvent.getSource().getBindingContext("odata");
				var oODataModel = oCtx.getModel();
				var sKey = oODataModel.createKey("/Orders", oCtx.getObject());
				oODataModel.remove(sKey, {
					success: function () {
						MessageToast.show("Order was successfully removed!")
					},
					error: function () {
						MessageBox.error("Error while removing order!");
					}
				});
			},
			onAddOrderPress: function () {
				var oView = this.getView();
				if (!this.oDialog) {
					this.oDialog = sap.ui.xmlfragment(oView.getId(), "leverx.app.view.fragments.AddOrderDialog", this);
					oView.addDependent(this.oDialog);
				}
				this.oDialog.bindObject({
					path: "odata>/Orders"
				});
				this.oDialog.open();
			},
			onCloseDialogPress: function () {
				this.oDialog.close();
			},
			onSendOrderPress: function () {
				var oModele = this.getView().getModel("oOrderView").getData();
				var oODataModel = this.getView().getModel("odata");
<<<<<<< HEAD
=======

>>>>>>> 08e0d1f7b5c46dbfc502e5d3898c5cf881174396
				oODataModel.create("/Orders", oModele, {
					success: function () {
						MessageToast.show("Supplier was successfully created!")
					},
					error: function () {
						MessageBox.error("Error while creating supplier!");
					}
				});
			},
			onFilterOrders : function (oEvent) {
			var oODataModel = this.getView().getModel("odata");
			var oTable = this.byId("ordersTable");
			var oBinding = oTable.getBinding("items");
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");

			if (sQuery) {
				aFilter.push(new Filter("summary/customer", FilterOperator.Contains, sQuery));
			}

			oBinding.filter(aFilter);
		}

		});
});
