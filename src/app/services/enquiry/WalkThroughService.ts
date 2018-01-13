import {WalkThroughConstants} from "../../configuration/constant/WalkThroughConstants";
import {HttpService} from "../../configuration/HttpService";
import {Injectable} from "@angular/core";

@Injectable()
export class WalkThroughService {
    constructor(private httpService: HttpService,
                private templateConstant: WalkThroughConstants) {

    }

    createTemplate(template) {
        let url = this.templateConstant.baseURL + this.templateConstant.createTemplate;
        return this.httpService.httpPost(url, template);
    }

    findTemplates() {
        let url = this.templateConstant.baseURL + this.templateConstant.findTemplates;
        return this.httpService.httpGet(url);
    }

    findQuestionType() {
        let url = this.templateConstant.baseURL + this.templateConstant.findQuestionType;
        return this.httpService.httpGet(url);
    }

    createQuestionItem(questionItem: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.createQuestionItem;
        return this.httpService.httpPost(url, questionItem);
    }

    findQuestionTypeByTemplateId(templateId: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findQuestionTypeByTemplateId;
        return this.httpService.httpGet(url.replace('${templateId}', templateId));
    }

    saveQuestion(question: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.saveQuestion;
        return this.httpService.httpPost(url, question);
    }

    findSingleOptionByItemId(id: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findSingleOptionByItemId;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    findWalkthroughByEnquiryId(enquiryId: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findWalkthroughByEnquiryId;
        return this.httpService.httpGet(url.replace('${id}', enquiryId));
    }

    findActiveTemplates(fkEventType: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findActiveTemplates;
        return this.httpService.httpGet(url.replace('${id}', fkEventType));
    }

    tagQuestionToOption(option: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.tagQuestionToOption;
        return this.httpService.httpPost(url, option);
    }

    findSubQuestionForOptions(id: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findSubQuestionForOptions;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    deactivateSubQuestionByOption(id) {
        let url = this.templateConstant.baseURL + this.templateConstant.deactivateSubQuestionByOption;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    mapEnquiryWalkthroughTemplate(enquiry: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.mapEnquiryWalkthroughTemplate;
        return this.httpService.httpPost(url, enquiry);
    }

    findQuestionIdByTemplateId(id: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findQuestionIdByTemplateId;
        return this.httpService.httpGet(url.replace('${id}', id));
    }

    findSubQuestionItemByOptionId(singleOptionAnswer: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findSubQuestionItemByOptionId;
        return this.httpService.httpGet(url.replace('${id}', singleOptionAnswer));
    }

    findPackages(searchCart: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findPackages;
        return this.httpService.httpPost(url, searchCart);
    }

    saveQuestionAnswer(answer: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.saveQuestionAnswer;
        return this.httpService.httpPost(url, answer);
    }

    findPackagesCount(searchCart: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findPackagesCount;
        return this.httpService.httpPost(url, searchCart);
    }

    addPackageToCart(cartPackage: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.addPackageToCart;
        return this.httpService.httpPost(url, cartPackage);
    }

    findCartSummeryDetail(fkWalkThroughId) {
        let url = this.templateConstant.baseURL + this.templateConstant.findCartSummeryDetail;
        return this.httpService.httpGet(url.replace('${fkWalkThroughId}', fkWalkThroughId));
    }

    findCartPackageByIds(fkWalkThrough, id) {
        let url = this.templateConstant.baseURL + this.templateConstant.findCartPackageByIds;
        return this.httpService.httpGet(
            url
                .replace('${fkWalkThrough}', fkWalkThrough)
                .replace('${id}', id));
    }

    updatePackageToCart(cartPackage: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.updatePackageToCart;
        return this.httpService.httpPost(url, cartPackage);
    }

    findCartPackageItems(fkWalkThroughId) {
        let url = this.templateConstant.baseURL + this.templateConstant.findCartPackageItems;
        return this.httpService.httpGet(url.replace('${fkWalkThroughId}', fkWalkThroughId));
    }

    saveClientStory(clientStory: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.saveClientStory;
        return this.httpService.httpPost(url, clientStory);
    }

    findClientStory(enquiryId: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findClientStory;
        return this.httpService.httpGet(url.replace('${id}', enquiryId));
    }

    findQuestionAnswer(fkWalkThroughId: any) {
        let url = this.templateConstant.baseURL + this.templateConstant.findQuestionAnswer;
        return this.httpService.httpGet(url.replace('${id}', fkWalkThroughId));
    }
}