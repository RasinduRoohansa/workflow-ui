import {Injectable} from "@angular/core";
import {AppConstants} from "../AppConstants";

const ADMIN_PATH = '/api/admin/';
const DASHBOARD_PATH = '/api/dashboard/';

@Injectable()
export class WalkThroughConstants {
    private _authURL: string;
    private _baseURL: string;

    private _createTemplate: string;
    private _findTemplates: string;
    private _findActiveTemplates: string;

    private _findQuestionType: string;
    private _createQuestionItem: string;
    private _findQuestionTypeByTemplateId: string;
    private _saveQuestion: string;
    private _tagQuestionToOption: string;
    private _findSingleOptionByItemId: string;
    private _findSubQuestionForOptions: string;
    private _deactivateSubQuestionByOption: string;
    private _findWalkthroughByEnquiryId: string;
    private _findQuestionIdByTemplateId: string;
    private _mapEnquiryWalkthroughTemplate: string;
    private _findSubQuestionItemByOptionId: string;
    private _saveQuestionAnswer: string;
    private _saveClientStory: string;
    private _findClientStory: string;
    private _findQuestionAnswer: string;

    private _findPackages: string;
    private _findPackagesCount: string;
    private _addPackageToCart: string;
    private _findCartSummeryDetail: string;
    private _findCartPackageByIds: string;
    private _updatePackageToCart: string;
    private _findCartPackageItems: string;

    constructor(private appConstants: AppConstants) {
        this._authURL = appConstants.authURL;
        this._baseURL = appConstants.baseURL;

        this._createTemplate = DASHBOARD_PATH + 'template/createTemplate';
        this._findTemplates = DASHBOARD_PATH + 'template/findTemplates';
        this._findActiveTemplates = DASHBOARD_PATH + 'template/findActiveTemplates/${id}';

        this._findQuestionType = DASHBOARD_PATH + 'question/findQuestionType';
        this._createQuestionItem = DASHBOARD_PATH + 'question/createQuestionItem';
        this._findQuestionTypeByTemplateId = DASHBOARD_PATH + 'question/findQuestionTypeByTemplateId/${templateId}';
        this._saveQuestion = DASHBOARD_PATH + 'question/saveQuestion';
        this._tagQuestionToOption = DASHBOARD_PATH + 'question/tagQuestionToOption';
        this._findSingleOptionByItemId = DASHBOARD_PATH + 'question/findSingleOptionByItemId/${id}';
        this._findSubQuestionForOptions = DASHBOARD_PATH + 'question/findSubQuestionForOptions/${id}';
        this._deactivateSubQuestionByOption = DASHBOARD_PATH + 'question/deactivateSubQuestionByOption/${id}';
        this._findWalkthroughByEnquiryId = DASHBOARD_PATH + 'walk-through/findWalkthroughByEnquiryId/${id}';
        this._findQuestionIdByTemplateId = DASHBOARD_PATH + 'walk-through/findQuestionIdByTemplateId/${id}';
        this._findSubQuestionItemByOptionId = DASHBOARD_PATH + 'walk-through/findSubQuestionItemByOptionId/${id}';
        this._mapEnquiryWalkthroughTemplate = DASHBOARD_PATH + 'walk-through/mapEnquiryWalkthroughTemplate';
        this._saveQuestionAnswer = DASHBOARD_PATH + 'walk-through/saveQuestionAnswer';
        this._saveClientStory = DASHBOARD_PATH + 'walk-through/saveClientStory';
        this._findClientStory = DASHBOARD_PATH + 'walk-through/findClientStory/${id}';
        this._findQuestionAnswer = DASHBOARD_PATH + 'walk-through/findQuestionAnswer/${id}';

        this._findPackages = DASHBOARD_PATH + 'cart/findPackages';
        this._findPackagesCount = DASHBOARD_PATH + 'cart/findPackagesCount';
        this._addPackageToCart = DASHBOARD_PATH + 'cart/addPackageToCart';
        this._updatePackageToCart = DASHBOARD_PATH + 'cart/updatePackageToCart';
        this._findCartSummeryDetail = DASHBOARD_PATH + 'cart/findCartSummeryDetail/${fkWalkThroughId}';
        this._findCartPackageByIds = DASHBOARD_PATH + 'cart/findCartPackageByIds/${fkWalkThrough}/${id}';
        this._findCartPackageItems = DASHBOARD_PATH + 'cart/findCartPackageItems/${fkWalkThroughId}';
    }

    get findQuestionAnswer(): string {
        return this._findQuestionAnswer;
    }

    get findClientStory(): string {
        return this._findClientStory;
    }

    get saveClientStory(): string {
        return this._saveClientStory;
    }

    get findCartPackageItems(): string {
        return this._findCartPackageItems;
    }

    get updatePackageToCart(): string {
        return this._updatePackageToCart;
    }

    get findCartPackageByIds(): string {
        return this._findCartPackageByIds;
    }

    get findCartSummeryDetail(): string {
        return this._findCartSummeryDetail;
    }

    get addPackageToCart(): string {
        return this._addPackageToCart;
    }

    get findPackagesCount(): string {
        return this._findPackagesCount;
    }

    get saveQuestionAnswer(): string {
        return this._saveQuestionAnswer;
    }

    get findPackages(): string {
        return this._findPackages;
    }

    get findSubQuestionItemByOptionId(): string {
        return this._findSubQuestionItemByOptionId;
    }

    get findQuestionIdByTemplateId(): string {
        return this._findQuestionIdByTemplateId;
    }

    get mapEnquiryWalkthroughTemplate(): string {
        return this._mapEnquiryWalkthroughTemplate;
    }

    get deactivateSubQuestionByOption(): string {
        return this._deactivateSubQuestionByOption;
    }

    get findSubQuestionForOptions(): string {
        return this._findSubQuestionForOptions;
    }

    get tagQuestionToOption(): string {
        return this._tagQuestionToOption;
    }

    get findActiveTemplates(): string {
        return this._findActiveTemplates;
    }

    get findWalkthroughByEnquiryId(): string {
        return this._findWalkthroughByEnquiryId;
    }

    get findSingleOptionByItemId(): string {
        return this._findSingleOptionByItemId;
    }

    get saveQuestion(): string {
        return this._saveQuestion;
    }

    get findQuestionTypeByTemplateId(): string {
        return this._findQuestionTypeByTemplateId;
    }

    get createQuestionItem(): string {
        return this._createQuestionItem;
    }

    get findQuestionType(): string {
        return this._findQuestionType;
    }

    get createTemplate(): string {
        return this._createTemplate;
    }

    get findTemplates(): string {
        return this._findTemplates;
    }

    get authURL(): string {
        return this._authURL;
    }

    get baseURL(): string {
        return this._baseURL;
    }
}