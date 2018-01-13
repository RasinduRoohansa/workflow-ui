import {AfterViewInit, Component, OnChanges, OnDestroy, OnInit} from '@angular/core';
import {AUTH} from "../../util/Constants";
import {AuthService} from "../../configuration/AuthService";
import {Store} from "../../util/Store";
import {Router} from "@angular/router";
import {NotificationUtils} from "../../util/NotificationUtil";
import {CommonUtilService} from "../../util/CommonUtilService";
import {SocialMediaService} from "../../services/socialmedia/SocialMediaService";

declare var $: any;

interface FileReaderEventTarget extends EventTarget {
    result: string
}

interface FileReaderEvent extends Event {
    target: FileReaderEventTarget;

    getMessage(): string;
}

@Component({
    moduleId: module.id,
    selector: 'register-cmp',
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    private user = {
        id: null,
        email: '',
        username: '',
        firstname: '',
        lastname: '',
        password: ''
    };
    private sub: any;
    private cpassword: string;

    constructor(private authService: AuthService,
                private store: Store,
                private route: Router,
                private notify: NotificationUtils,
                private commonUtil: CommonUtilService,
                private socialAuth: SocialMediaService) {

    }

    readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e: FileReaderEvent) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    checkFullPageBackgroundImage() {
        var $page = $('.full-page');
        var image_src = $page.data('image');

        if (image_src !== undefined) {
            var image_container = '<div class="full-page-background" style="background-image: url(' + image_src + ') "/>'
            $page.append(image_container);
        }
    };

    ngOnInit() {
        this.findUserDetail();
        this.checkFullPageBackgroundImage();
        // Code for the Validator
        var $validator = $('.wizard-card form').validate({
            rules: {
                firstname: {
                    required: true,
                    minlength: 3
                },
                lastname: {
                    required: true,
                    minlength: 3
                },
                email: {
                    required: true,
                    minlength: 3,
                }
            },

            errorPlacement: function (error, element) {
                $(element).parent('div').addClass('has-error');
            }
        });

        // Wizard Initialization
        $('.wizard-card').bootstrapWizard({
            'tabClass': 'nav nav-pills',
            'nextSelector': '.btn-next',
            'previousSelector': '.btn-previous',

            onNext: function (tab, navigation, index) {
                var $valid = $('.wizard-card form').valid();
                if (!$valid) {
                    $validator.focusInvalid();
                    return false;
                }
            },

            onInit: function (tab, navigation, index) {

                //check number of tabs and fill the entire row
                var $total = navigation.find('li').length;
                var $width = 100 / $total;
                var $wizard = navigation.closest('.wizard-card');

                var $display_width = $(document).width();

                if ($display_width < 600 && $total > 3) {
                    $width = 50;
                }

                navigation.find('li').css('width', $width + '%');
                var $first_li = navigation.find('li:first-child a').html();
                var $moving_div = $('<div class="moving-tab">' + $first_li + '</div>');
                $('.wizard-card .wizard-navigation').append($moving_div);

                //    this.refreshAnimation($wizard, index);
                var total_steps = $wizard.find('li').length;
                var move_distance = $wizard.width() / total_steps;
                var step_width = move_distance;
                move_distance *= index;

                var $current = index + 1;

                if ($current == 1) {
                    move_distance -= 8;
                } else if ($current == total_steps) {
                    move_distance += 8;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, 0, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });

                $('.moving-tab').css('transition', 'transform 0s');
            },

            onTabClick: function (tab, navigation, index) {

                var $valid = $('.wizard-card form').valid();

                if (!$valid) {
                    return false;
                } else {
                    return true;
                }
            },

            onTabShow: function (tab, navigation, index) {
                var $total = navigation.find('li').length;
                var $current = index + 1;

                var $wizard = navigation.closest('.wizard-card');

                // If it's the last tab then hide the last button and show the finish instead
                if ($current >= $total) {
                    $($wizard).find('.btn-next').hide();
                    $($wizard).find('.btn-finish').show();
                } else {
                    $($wizard).find('.btn-next').show();
                    $($wizard).find('.btn-finish').hide();
                }

                var button_text = navigation.find('li:nth-child(' + $current + ') a').html();

                setTimeout(function () {
                    $('.moving-tab').text(button_text);
                }, 150);

                var checkbox = $('.footer-checkbox');

                if (index !== 0) {
                    $(checkbox).css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'position': 'absolute'
                    });
                } else {
                    $(checkbox).css({
                        'opacity': '1',
                        'visibility': 'visible'
                    });
                }

                // this.refreshAnimation($wizard, index);
                var total_steps = $wizard.find('li').length;
                var move_distance = $wizard.width() / total_steps;
                var step_width = move_distance;
                move_distance *= index;

                var $current = index + 1;

                if ($current == 1) {
                    move_distance -= 8;
                } else if ($current == total_steps) {
                    move_distance += 8;
                }

                $wizard.find('.moving-tab').css('width', step_width);
                $('.moving-tab').css({
                    'transform': 'translate3d(' + move_distance + 'px, 0, 0)',
                    'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

                });
            }
        });


        // Prepare the preview for profile picture
        $("#wizard-picture").change(function () {

            this.readURL(this);
        });

        $('[data-toggle="wizard-radio"]').click(function () {
            console.log('click');

            var wizard = $(this).closest('.wizard-card');
            wizard.find('[data-toggle="wizard-radio"]').removeClass('active');
            $(this).addClass('active');
            $(wizard).find('[type="radio"]').removeAttr('checked');
            $(this).find('[type="radio"]').attr('checked', 'true');
        });

        $('[data-toggle="wizard-checkbox"]').click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $(this).find('[type="checkbox"]').removeAttr('checked');
            } else {
                $(this).addClass('active');
                $(this).find('[type="checkbox"]').attr('checked', 'true');
            }
        });

        $('.set-full-height').css('height', 'auto');

    }

    ngOnChanges() {
        var input = $(this);
        var target: EventTarget;
        if (input.files && input.files[0]) {
            var reader: any = new FileReader();

            reader.onload = function (e) {
                $('#wizardPicturePreview').attr('src', e.target.result).fadeIn('slow');
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    ngAfterViewInit() {
        $('.wizard-card').each(function () {

            var $wizard = $(this);
            var index = $wizard.bootstrapWizard('currentIndex');
            // this.refreshAnimation($wizard, index);

            var total_steps = $wizard.find('li').length;
            var move_distance = $wizard.width() / total_steps;
            var step_width = move_distance;
            move_distance *= index;

            var $current = index + 1;

            if ($current == 1) {
                move_distance -= 8;
            } else if ($current == total_steps) {
                move_distance += 8;
            }

            $wizard.find('.moving-tab').css('width', step_width);
            $('.moving-tab').css({
                'transform': 'translate3d(' + move_distance + 'px, 0, 0)',
                'transition': 'all 0.5s cubic-bezier(0.29, 1.42, 0.79, 1)'

            });

            $('.moving-tab').css({
                'transition': 'transform 0s'
            });
        });
    }

    findUserDetail() {
        this.authService.findUser(this.store.getData(AUTH.username))
            .subscribe(res => {
                this.user.email = res.email;
                this.user.username = res.username;
                this.user.id = res.id;
            });
    }

    registerAccount() {
        var valid = true;
        if (this.user.password.length < 6) {
            valid = false;
            this.notify.error('Password should contain more than 6 characters');
        }

        if (this.user.password != this.cpassword) {
            this.notify.error('Password & confirm password is not matched');
            valid = false;
        }

        if (valid) {
            this.store.setData(AUTH.userFullname, this.user.firstname + ' ' + this.user.lastname);
            this.authService.updateUser(this.user)
                .subscribe(res => {
                    this.route.navigate(['/dashboard']);
                    this.notify.success(this.commonUtil.findDayStatus() + ' ' + this.store.getData(AUTH.userFullname) + '! Your profile has been updated. Welcome to the edgeVantage!');
                });
        }
    }

    socialLogin(provider) {
        this.sub = this.socialAuth.loginUser(provider, this.user);
    }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
        }
    }
}
