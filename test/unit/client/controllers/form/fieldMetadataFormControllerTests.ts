/// <reference path="../../../../jasmine.d.ts" />
/// <reference path="../../../mocks/scopeMock.ts" />
/// <reference path="../../../mocks/messagingServiceMock.ts" />
/// <reference path="../../../mocks/notificationServiceMock.ts" />
/// <reference path="../../../mocks/queueServiceMock.ts" />
/// <reference path="../../../mocks/stateServiceMock.ts" />
/// <reference path="../../../mocks/entityRepositoryServiceMock.ts" />
/// <reference path="../../../mocks/entityMetadataListCacheServiceMock.ts" />
/// <reference path="../../../mocks/entityModelMapperServiceMock.ts" />
/// <reference path="../../../mocks/localizationServiceMock.ts" />
/// <reference path="../../../mocks/redirectServiceMock.ts" />
/// <reference path="../../../../../client/angular/controllers/form/fieldMetadataFormController.ts" />

'use strict';
var _global:any = this;
var OriginalServices:any;

describe('Controller: FieldMetadataFormController', function ():void {
    var scopeMock:any;
    var routeParams:any;
    var messagingServiceMock:Mocks.MessagingServiceMock;
    var notificationServiceMock:Mocks.NotificationServiceMock;
    var queueServiceMock:Mocks.QueueServiceMock;
    var stateServiceMock:Mocks.StateServiceMock;
    var entityRepositoryServiceMock:Mocks.EntityRepositoryServiceMock;
    var entityMetadataListCacheServiceMock:Mocks.EntityMetadataListCacheServiceMock;
    var entityModelMapperServiceMock:Mocks.EntityModelMapperServiceMock;
    var localizationServiceMock:Mocks.LocalizationServiceMock;
    var redirectServiceMock:Mocks.RedirectServiceMock;
    var systemUnderTest:Controllers.FieldMetadataFormController;

    //Helper methods
    var createFieldMetadataFormController:() => void = function ():void {
        systemUnderTest = new Controllers.FieldMetadataFormController(
            scopeMock,
            routeParams,
            messagingServiceMock,
            notificationServiceMock,
            queueServiceMock,
            stateServiceMock,
            entityRepositoryServiceMock,
            entityMetadataListCacheServiceMock,
            localizationServiceMock,
            entityModelMapperServiceMock,
            redirectServiceMock);
    };

    beforeEach(function ():void {
        scopeMock = new Mocks.ScopeMock();
        routeParams = {'_entityName': 'MockEntity'};
        messagingServiceMock = new Mocks.MessagingServiceMock();
        notificationServiceMock = new Mocks.NotificationServiceMock();
        queueServiceMock = new Mocks.QueueServiceMock();
        stateServiceMock = new Mocks.StateServiceMock();
        entityRepositoryServiceMock = new Mocks.EntityRepositoryServiceMock();
        entityMetadataListCacheServiceMock = new Mocks.EntityMetadataListCacheServiceMock();
        entityModelMapperServiceMock = new Mocks.EntityModelMapperServiceMock();
        localizationServiceMock = new Mocks.LocalizationServiceMock();
        redirectServiceMock = new Mocks.RedirectServiceMock();

        OriginalServices = _global.Services;
        _global.Services = {LocalizationService: localizationServiceMock};

        createFieldMetadataFormController();
    });

    afterEach(function ():void {
        _global.Services = OriginalServices;
    });

    it('should load entity metadata from metadata cache', function ():void {
        //Arrange
        var loadEntityMetadataFromCacheSpy:any = entityMetadataListCacheServiceMock.LoadEntityMetadataFromCache;

        //Act
        //Assert
        expect(loadEntityMetadataFromCacheSpy.calls.any()).toEqual(true);
        expect(systemUnderTest.FormHeader).toEqual('#AddNewField');
        expect(systemUnderTest.SubmitButtonText).toEqual('#Add');
    });

    it('should display updates header when working with existing field', function ():void {
        //Arrange
        var displayItemMessageSpy:any = messagingServiceMock.Messages.Form.DisplayItem.subscribe;
        var displayItemMessageSubscribedFunction:any = displayItemMessageSpy.calls.first().args[0];
        var entity:Models.Entity = new Models.Entity('ExistingEntity');
        var metadata:Models.EntityMetadata = new Models.EntityMetadata();
        var field:Models.FieldMetadata = new Models.FieldMetadata('FieldTypeName');
        field.FieldSystemName = 'FieldTypeName';
        metadata.Fields = [field];

        //Act
        displayItemMessageSubscribedFunction({Data: entity, Metadata: metadata});

        //Assert
        expect(systemUnderTest.FormHeader).toEqual('#UpdateField');
        expect(systemUnderTest.SubmitButtonText).toEqual('#Update');
    });

    it('should recreate form when type of field is changed', function ():void {
        //Arrange
        var displayItemMessageSpy:any = messagingServiceMock.Messages.Form.DisplayItem.subscribe;
        var displayItemMessageSubscribedFunction:any = displayItemMessageSpy.calls.first().args[0];
        var entity:Models.Entity = new Models.Entity('ExistingEntity');
        var metadata:Models.EntityMetadata = new Models.EntityMetadata();
        var field:Models.FieldMetadata = new Models.FieldMetadata('FieldTypeName');
        field.FieldSystemName = 'FieldTypeName';
        metadata.Fields = [field];

        //Act
        displayItemMessageSubscribedFunction({Data: entity, Metadata: metadata});
        field.ValueChanged(new Models.SelectFieldOptionMetadata('Boolean', null), true);

        //Assert
        expect(systemUnderTest.EntityMetadata.Fields.length).toEqual(6);
    });

    it('should not create field when field with same name already exists', function ():void {
        //Arrange
        var originalMetadata:Models.EntityMetadata = new Models.EntityMetadata();
        var field:Models.FieldMetadata = new Models.FieldMetadata('EntityModelMapperServiceMockFieldMetadata');
        field.FieldSystemName = 'EntityModelMapperServiceMockFieldMetadata';
        originalMetadata.Fields = [field];
        systemUnderTest.OriginalMetadata = originalMetadata;
        systemUnderTest.Entity = new Models.Entity('EntityModelMapperServiceMockFieldMetadata');
        var saveEntityMetadataSpy:any = entityRepositoryServiceMock.SaveEntityMetadata;
        var notifyMessageSpy:any = notificationServiceMock.NotifyMessage;

        //Act
        systemUnderTest.SubmitForm();

        //Assert
        expect(saveEntityMetadataSpy.calls.any()).toEqual(false);
        expect(notifyMessageSpy.calls.any()).toEqual(true);
        expect(notifyMessageSpy.calls.first().args[0]).toEqual('#FieldAlreadyExists');
    });

    it('should be able to update existing field', function ():void {
        //Arrange
        var originalEntity:Models.Entity = new Models.Entity('EntityModelMapperServiceMockFieldMetadata');
        systemUnderTest.OriginalEntity = originalEntity;
        var originalMetadata:Models.EntityMetadata = new Models.EntityMetadata();
        var field:Models.FieldMetadata = new Models.FieldMetadata('EntityModelMapperServiceMockFieldMetadata');
        field.FieldSystemName = 'EntityModelMapperServiceMockFieldMetadata';
        originalMetadata.Fields = [field];
        systemUnderTest.OriginalMetadata = originalMetadata;
        systemUnderTest.Entity = new Models.Entity('EntityModelMapperServiceMockFieldMetadata');
        var saveEntityMetadataSpy:any = entityRepositoryServiceMock.SaveEntityMetadata;
        var notifyMessageSpy:any = notificationServiceMock.NotifyMessage;

        //Act
        systemUnderTest.SubmitForm();

        //Assert
        expect(saveEntityMetadataSpy.calls.any()).toEqual(true);
        expect(saveEntityMetadataSpy.calls.first().args[0].Fields.length).toEqual(1);
        expect(notifyMessageSpy.calls.any()).toEqual(true);
        expect(notifyMessageSpy.calls.first().args[0]).toEqual('#MetadataSavedSuccess');
    });

    it('should notify user and create new field form after metadata are saved', function ():void {
        //Arrange
        var originalMetadata:Models.EntityMetadata = new Models.EntityMetadata();
        var field:Models.FieldMetadata = new Models.FieldMetadata('SomeFieldName');
        field.FieldSystemName = 'SomeFieldName';
        originalMetadata.Fields = [field];
        systemUnderTest.OriginalMetadata = originalMetadata;
        systemUnderTest.Entity = new Models.Entity('AnotherFieldName');
        var saveEntityMetadataSpy:any = entityRepositoryServiceMock.SaveEntityMetadata;
        var notifyMessageSpy:any = notificationServiceMock.NotifyMessage;

        //Act
        systemUnderTest.SubmitForm();

        //Assert
        expect(saveEntityMetadataSpy.calls.any()).toEqual(true);
        expect(saveEntityMetadataSpy.calls.first().args[0].Fields.length).toEqual(2);
        expect(notifyMessageSpy.calls.any()).toEqual(true);
        expect(notifyMessageSpy.calls.first().args[0]).toEqual('#MetadataFieldCreatedSuccess');
    });
});
