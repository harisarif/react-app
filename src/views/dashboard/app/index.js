import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "../../../components/Card";
import { Link } from "react-router-dom";
import styles from './index.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const Index = () => {
  return (
    <>
<div className="default-layout_layout__qyW8_">
        <div className="default-layout_layout__container__daLGs">
          <div className="default-layout_layout__header__DiRAG">
            <header className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp mega-menu_header__Gb1tE mega-menu_header--show___5uwv mega-menu_header--with-banner__0lmqG">
              <div className="mega-menu_header__banner-container___CTFO">
                <div>
                  <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh banner_banner__YXMRo">
                    <div className="module-content_module-content__JtNA_ banner_banner__content__vinCs">
                      <div className="rich-text_rich-text__y_zI2 banner__text">
                        <p className="text_text__NFIw2 text_text--size-sm__b7SaZ block-paragraph">
                          Unlock your free trial
                        </p>
                      </div>
                      <a href>
                        <p className="text_text__NFIw2 text_text--size-sm__b7SaZ banner__cta">
                          Join Now
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mega-menu_header__content__DTwOP">
                <a className="mega-menu_header__logo__PDxP9" href="#">
                  <img src="./images/Equity_Circle.png" width={130} alt="" />
                </a>
                <nav className="mega-menu_header__navigation__r50sd mega-menu_header__navigation--desktop__1_Ny1">
                  <ul className="mega-menu_header__navigation-items__aqIS6 mega-menu_header__navigation-items--desktop__y6o8L">
                    <li className="text_text__NFIw2 text_text--size-sm__b7SaZ mega-menu_header__navigation-item__D6nNT">
                      <a aria-current="false" className="mega-menu_header__navigation-link__zS3G7" href="#">
                        Why Equity Circle
                      </a>
                    </li>
                    <li className="text_text__NFIw2 text_text--size-sm__b7SaZ mega-menu_header__navigation-item__D6nNT">
                      <a aria-current="false" className="mega-menu_header__navigation-link__zS3G7" href="#">
                        The Metrics
                      </a>
                    </li>
                    <li className="text_text__NFIw2 text_text--size-sm__b7SaZ mega-menu_header__navigation-item__D6nNT">
                      <a aria-current="false" className="mega-menu_header__navigation-link__zS3G7" href="#">
                        Trial Equity Circle
                      </a>
                    </li>
                    <li className="text_text__NFIw2 text_text--size-sm__b7SaZ mega-menu_header__navigation-item__D6nNT mega-menu_header__navigation-item--active___NVIZ">
                      <a aria-current="page" className="mega-menu_header__navigation-link__zS3G7" href="#">
                        Memberships
                      </a>
                    </li>
                    <li className="text_text__NFIw2 text_text--size-sm__b7SaZ mega-menu_header__navigation-item__D6nNT">
                      <a aria-current="false" className="mega-menu_header__navigation-link__zS3G7" href="#">
                        Accessories
                      </a>
                    </li>
                  </ul>
                </nav>
                <div className="mega-menu_header__navigation-cta-container__0IBNA">
                  <a href="#" className="primary-button_primary-cta__DzHjl primary-button_primary-cta--theme-light__YnJBc primary-button_primary-cta--size-sm__Lad_U">
                    <span className="primary-button_primary-cta__label__b6BiV">
                      Join
                      Now
                    </span>
                  </a>
                </div>
                <button className="icon-button_icon-button__cnqXV icon-button_icon-button--dark__imazq icon-button_icon-button--size-lg___C7i1 mega-menu_header__mobile-navigation-button__tFkem">
                  <span className="icon-button_icon-button__svg-wrapper__TyXaJ icon-button_icon-button__svg-direction--up__zC9Pr" style={{width: '36px', height: '36px'}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" role="presentation" focusable="false" viewBox="0 0 24 24">
                      <line x1={1} y1={3} x2={23} y2={3} stroke="#ffffffff" strokeWidth={2} strokeLinecap="round" />
                      <line x1={1} y1={12} x2={23} y2={12} stroke="#ffffffff" strokeWidth={2} strokeLinecap="round" />
                      <line x1={1} y1={21} x2={23} y2={21} stroke="#ffffffff" strokeWidth={2} strokeLinecap="round" />
                    </svg>
                  </span>
                </button>
              </div>
            </header>
          </div>
          <main id="main-content" className="default-layout_layout__content__idux3" tabIndex={-1} role="main">
            <div className="page-membership">
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp full-bleed-hero_wrapper__Mm2eC">
                <div className="full-bleed-hero_container__0VKze container--hero-section-visible" style={{ '--scroll-progress': '100' }}>
                  <div className="full-bleed-hero_parallax-main-content-container__OG6FM">
                    <div className="full-bleed-hero_parallax-main-content__YuaEy">
                      <div className="video-player_video-player__jcPeV video-player_video-player--ratio-16-9__qYzOl full-bleed-hero_parallax-main-content__video__IU2If">
                        <video className="full-bleed-hero_parallax-main-content__video__IU2If" autoPlay muted playsInline loop id="hero-video-loop" aria-label="Main hero video">
                          <source src="./images/Equity-header.mp4" type="video/mp4" />
                        </video>
                      </div>
                      <div className="full-bleed-hero_parallax-overlay__x0S6y">
                        <div className="full-bleed-hero_parallax-overlay__text-container__d7xpi">
                          <h1 className="heading_heading__Gh8z9 heading_heading--size-lg-2xl__scbcO" style={{opacity: 1, transform: 'none'}}>Power
                            your performance with 24/7
                            data</h1>
                        </div>
                        <button aria-label="Pause video" aria-controls="hero-video-loop" className="icon-button_icon-button__cnqXV icon-button_icon-button--dark__imazq icon-button_icon-button--size-sm__V_r6R full-bleed-hero_parallax-overlay__control-button__g9ddc" tabIndex={-1}>
                          <span className="icon-button_icon-button__svg-wrapper__TyXaJ icon-button_icon-button__svg-direction--up__zC9Pr" style={{width: '20px', height: '20px'}}>
                            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M10 19H6L6 5L10 5L10 19ZM14 19L14 5L18 5V19H14Z" fill="#ffffffff" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-fluid p-lg-5 p-sm-2 slick-slider-main-wrapper">
                <div className="center">
                  <div className="main-wrapper">
                    <div className="img-wrapper">
                      <img src="./images/imgNo1.png" alt="" />
                    </div>
                    <div className="content-wrapper"> 
                      <span>03</span>
                      <h3>
                        Mathieu van der Poel
                      </h3>
                      <p>The most valuable athletes track the most valuable metrics. WHOOP gives Mathieu van der Poel the data he needs to unlock his potential.</p>
                    </div>
                  </div>
                  <div className="main-wrapper">
                    <div className="img-wrapper">
                      <img src="./images/imgNo2.png" alt="" />
                    </div>
                    <div className="content-wrapper">
                      <span>03</span>
                      <h3>
                        Mathieu van der Poel
                      </h3>
                      <p>The most valuable athletes track the most valuable metrics. WHOOP gives Mathieu van der Poel the data he needs to unlock his potential.</p>
                    </div>
                  </div>
                  <div className="main-wrapper">
                    <div className="img-wrapper">
                      <img src="./images/imgNo3.png" alt="" />
                    </div>
                    <div className="content-wrapper">
                      <span>03</span>
                      <h3>
                        Mathieu van der Poel
                      </h3>
                      <p>The most valuable athletes track the most valuable metrics. WHOOP gives Mathieu van der Poel the data he needs to unlock his potential.</p>
                    </div>
                  </div>
                  <div className="main-wrapper">
                    <div className="img-wrapper">
                      <img src="./images/imgNo4.png" alt="" />
                    </div>
                    <div className="content-wrapper">
                      <span>03</span>
                      <h3>
                        Mathieu van der Poel
                      </h3>
                      <p>The most valuable athletes track the most valuable metrics. WHOOP gives Mathieu van der Poel the data he needs to unlock his potential.</p>
                    </div>
                  </div>
                  <div className="main-wrapper">
                    <div className="img-wrapper">
                      <img src="./images/imgNo5.png" alt="" />
                    </div>
                    <div className="content-wrapper">
                      <span>03</span>
                      <h3>
                        Mathieu van der Poel
                      </h3>
                      <p>The most valuable athletes track the most valuable metrics. WHOOP gives Mathieu van der Poel the data he needs to unlock his potential.</p>
                    </div>
                  </div>
                  <div className="main-wrapper">
                    <div className="img-wrapper">
                      <img src="./images/imgNo1.png" alt="" />
                    </div>
                    <div className="content-wrapper">
                      <span>03</span>
                      <h3>
                        Mathieu van der Poel
                      </h3>
                      <p>The most valuable athletes track the most valuable metrics. WHOOP gives Mathieu van der Poel the data he needs to unlock his potential.</p>
                    </div>
                  </div>
                  <div className="main-wrapper">
                    <div className="img-wrapper">
                      <img src="./images/imgNo2.png" alt="" />
                    </div>
                    <div className="content-wrapper">
                      <span>03</span>
                      <h3>
                        Mathieu van der Poel
                      </h3>
                      <p>The most valuable athletes track the most valuable metrics. WHOOP gives Mathieu van der Poel the data he needs to unlock his potential.</p>
                    </div>
                  </div>
                  <div className="main-wrapper">
                    <div className="img-wrapper">
                      <img src="./images/imgNo3.png" alt="" />
                    </div>
                    <div className="content-wrapper">
                      <span>03</span>
                      <h3>
                        Mathieu van der Poel
                      </h3>
                      <p>The most valuable athletes track the most valuable metrics. WHOOP gives Mathieu van der Poel the data he needs to unlock his potential.</p>
                    </div>
                  </div>
                  <div className="main-wrapper">
                    <div className="img-wrapper">
                      <img src="./images/imgNo4.png" alt="" />
                    </div>
                    <div className="content-wrapper">
                      <span>03</span>
                      <h3>
                        Mathieu van der Poel
                      </h3>
                      <p>The most valuable athletes track the most valuable metrics. WHOOP gives Mathieu van der Poel the data he needs to unlock his potential.</p>
                    </div>
                  </div>
                  <div className="main-wrapper">
                    <div className="img-wrapper">
                      <img src="./images/imgNo5.png" alt="" />
                    </div>
                    <div className="content-wrapper">
                      <span>03</span>
                      <h3>
                        Mathieu van der Poel
                      </h3>
                      <p>The most valuable athletes track the most valuable metrics. WHOOP gives Mathieu van der Poel the data he needs to unlock his potential.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="sticky-call-to-action_sticky-call-to-action__9pD4A sticky-call-to-action_sticky-call-to-action--hidden__MX5np">
                <a href="#" className="primary-button_primary-cta__DzHjl primary-button_primary-cta--theme-dark__n6Hxd primary-cta--size-lg">
                  <span className="primary-button_primary-cta__label__b6BiV">Join
                    Now</span>
                </a>
              </div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh spacer spacer_spacer--medium__jX0Eb" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh headline-left-aligned headline-left-aligned_headline-left-aligned--fill__164dI headline-left-aligned_headline-left-aligned--with-cta__mTdla"><div className="module-content_module-content__JtNA_ module-content_module-content--flexible-grid__NvyyD headline-left-aligned_headline-left-aligned__container__anhhL"><h2 className="heading_heading__Gh8z9 heading_heading--size-xl__pvIP0 headline-left-aligned_headline-left-aligned__headline__YSkmi" style={{opacity: 1, transform: 'none'}}>Only
                    track metrics that matter</h2><div className="headline-left-aligned_headline-left-aligned__content__VC3EH"><div className="rich-text_rich-text__y_zI2" style={{opacity: 1, transform: 'none'}}><p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">Understanding
                        your health and fitness at this
                        level has been impossible—until now.
                        Equity Circle only captures the
                        biometric
                        data shown to have the most
                        meaningful impact on your health. No
                        other wearable gives you a more
                        comprehensive look at your body’s
                        key performance data, and helps you
                        understand what to do with
                        it.</p></div></div><div className="headline-left-aligned_headline-left-aligned__cta__TCpUz" style={{opacity: 1, transform: 'none'}}><div className="utility-hero__cta"><a className="secondary-button_secondary-cta__ywfX1 secondary-button_secondary-cta--theme-dark__mZVoR" href="#"><span className="secondary-button_secondary-cta__label__Ba4op">What
                          Equity Circle
                          Measures</span></a></div></div></div></div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh featured-app-animation_featured-app-animation__jTwDH"><div className="module-content_module-content__JtNA_ featured-app-animation_featured-app-animation__vertical-track-container__8x4gE featured-app-animation_featured-app-animation__vertical-track-container--sticky__rHBRH"><div className="featured-app-animation_featured-app-animation__vertical-track__5R4Jv featured-app-animation_featured-app-animation__vertical-track--active__3WtxW"><div className="featured-app-animation_featured-app-animation__panel__gOcCB featured-app-animation_featured-app-animation__panel--main__saU35" aria-hidden="false"><div className="featured-app-animation_featured-app-animation__panel-inner__PXRYs featured-app-animation_featured-app-animation__panel-inner--main___q9kC"><div className="image-wrapped_wrapped-image__c3jd0 featured-app-animation_featured-app-animation__panel-image__oZr5I"><img alt="" loading="lazy" width={1230} height={2592} decoding="async" data-nimg={1} style={{color: 'transparent'}} src="./images/4-en-sleep-overview-new__2_.webp" /></div><div style={{opacity: 1, transform: 'none'}} className="featured-app-animation_featured-app-animation__panel-text__y53iH"><div className="featured-app-animation_featured-app-animation__panel-text-inner__MZ3e3"><div className="featured-app-animation_featured-app-animation__panel-text-icon__T8UJF"><svg xmlns="http://www.w3.org/2000/svg" width={33} height={33} viewBox="0 0 33 33" fill="none" role="img"><title>Equity
                                  Circle
                                  Logo</title><path fill="#ffffffff" fillRule="evenodd" clipRule="evenodd" d="M8.94849 11.3906L11.2193 18.3681H12.6413L10.3717 11.3906H8.94849ZM23.5507 11.3906L20.6119 20.422L19.0516 15.6287H17.6296L19.9004 22.6085H21.3236L24.9739 11.3906H23.5507ZM12.5988 22.6085L16.2503 11.3906H17.6723L14.022 22.6085H12.5988Z" /><circle cx="16.961" cy="16.838" r="15.0239" stroke="#ffffffff" strokeWidth="2.00319" /></svg></div><span className="text_text__NFIw2 text_text--size-lg__uWJQC featured-app-animation_featured-app-animation__panel-text-heading__9Qct7">OPTIMAL
                              SLEEP</span><p className="text_text__NFIw2 text_text--size-md__z_JDN featured-app-animation_featured-app-animation__panel-text-copy__iuIZx">You
                              achieved peak Sleep
                              Performance and maximal
                              Sleep Consistency. This
                              is the best way to set
                              up your body for
                              healthy, restorative
                              Sleep.</p></div></div></div></div></div></div><div className="featured-app-animation_featured-app-animation__featured-block__XvvYG"><div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh feature-block_feature-block___ZNm8"><div className="module-content_module-content__JtNA_ module-content_module-content--flexible-grid__NvyyD"><div className="feature-block_feature-block__media__vs1FT feature-block_feature-block__media--rectangle__z_pqQ feature-block_feature-block__media--image__xrGSz"><div className="image-wrapped_wrapped-image__c3jd0 feature-block_feature-block__image__FA5rb" data-aspect-ratio="16:9"><img alt="Michael Phelps asleep using Equity Circle sleep product features." loading="lazy" width={3200} height={1800} decoding="async" data-nimg={1} style={{color: 'transparent'}} src="./images/phelps-sleep__1_.webp" /></div></div><div className="feature-block_feature-block__grid__RdnO6"><div style={{opacity: 1, transform: 'none'}}><h2 className="heading_heading__Gh8z9 heading_heading--size-sm__cLpnR feature-block_feature-block__heading__762od">Equity
                            Circle
                            doesn’t just track — it
                            translates.</h2></div><div className="feature-block_feature-block__text-wrap__RCn57"><div className="rich-text_rich-text__y_zI2 feature-block_feature-block__copy__ReljJ" style={{opacity: 1, transform: 'none'}}><p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">When
                              you get started on
                              Equity Circle, you set a
                              goal
                              for yourself. Equity
                              Circle then
                              learns your body’s
                              baselines and patterns
                              to coach you with custom
                              recommendations on how
                              to tailor your
                              lifestyle, habits,
                              training programs, and
                              more to unlock your
                              potential.
                            </p></div></div></div></div></div></div></div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh spacer spacer_spacer--large__IyVm7" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp spacer spacer_spacer--large__IyVm7" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp headline-left-aligned headline-left-aligned_headline-left-aligned--stacked__wFlr2"><div className="module-content_module-content__JtNA_ module-content_module-content--flexible-grid__NvyyD headline-left-aligned_headline-left-aligned__container__anhhL"><h2 className="heading_heading__Gh8z9 heading_heading--size-xl__pvIP0 headline-left-aligned_headline-left-aligned__headline__YSkmi" style={{opacity: 1, transform: 'none'}}>What
                    makes Equity Circle different makes it
                    better</h2><div className="headline-left-aligned_headline-left-aligned__content__VC3EH" /></div></div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp feature-block_feature-block___ZNm8 feature-block_feature-block--with-cta__Qkse1"><div className="module-content_module-content__JtNA_ module-content_module-content--flexible-grid__NvyyD"><div className="feature-block_feature-block__media__vs1FT feature-block__media--pill feature-block__media--video"><div className="feature-block_feature-block__media-video-wrapper__DZB2_ scroll-effect" style={{}}><div className="video-player_video-player__jcPeV video-player_video-player--ratio-16-9__qYzOl video-player_feature-block__video__MqZPa">
                        <video className="feature-block__video" autoPlay playsInline loop muted>
                          <source src="./images/battery-animation__2_.mp4" type="video/mp4" />
                        </video>
                      </div></div></div><div className="feature-block_feature-block__grid__RdnO6"><div style={{opacity: 1, transform: 'translateY(20px) translateZ(0px)'}}><h2 className="heading_heading__Gh8z9 heading_heading--size-sm__cLpnR feature-block_feature-block__heading__762od">No
                        screens. No distractions. Just
                        science. </h2></div><div className="feature-block_feature-block__text-wrap__RCn57"><div className="rich-text_rich-text__y_zI2 feature-block_feature-block__copy__ReljJ" style={{opacity: 1, transform: 'translateY(20px) translateZ(0px)'}}><p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">We
                          skipped the unnecessary frills
                          to build the most wearable
                          technology on the market. A
                          minimalist, screen-free design
                          means you can wear it 24/7.
                          Never take it off to charge
                          thanks to a wireless battery
                          pack. Change things up and wear
                          your Equity Circle anywhere on
                          your
                          body. And get lab-level accurate
                          data that outperforms other
                          leading wearables.</p></div><a className="secondary-button_secondary-cta__ywfX1 secondary-button_secondary-cta--theme-light__n9y5O feature-block_feature-block__cta__6IqdX" href="#"><span className="secondary-button_secondary-cta__label__Ba4op">DISCOVER
                          THE
                          DIFFERENCE</span></a></div></div></div></div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp spacer spacer_spacer--large__IyVm7" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh spacer spacer_spacer--medium__jX0Eb" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh banner-carousel banner-carousel_banner-carousel--gray__yg0N1"><div className="module-content_module-content__JtNA_ banner-carousel_banner-carousel-wrapper__W_2pF"><div className="banner-carousel__slider keen-slider"><div className="banner-carousel-card_banner-carousel-card__MioXM keen-slider__slide banner-carousel__slider--item" style={{minWidth: '100%', maxWidth: '1242px', transform: 'translate3d(0px, 0px, 0px)'}}><div className="banner-carousel-card_banner-carousel-card__image__SA8pg"><div className="image-wrapped_wrapped-image__c3jd0" data-aspect-ratio="4:3"><img alt="" loading="lazy" width={1800} height={1000} decoding="async" data-nimg={1} style={{color: 'transparent'}} src="./images/IMG_0914_5_v2__2_.webp" /></div></div><div className="banner-carousel-card_banner-carousel-card__content__1YhGe"><div className="banner-carousel-card_banner-carousel-card__texts-wrap__Qo7rW"><h4 className="heading_heading__Gh8z9 heading_heading--size-sm__cLpnR banner-carousel-card__heading">Try
                            Equity Circle free for 1
                            Month</h4><div className="rich-text_rich-text__y_zI2 banner-carousel-card__body-content"><p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">There's
                              never been a better time
                              to invest in your health
                              &amp; fitness. Take 1
                              month to track your
                              sleep, strain, recovery,
                              stress, and health, and
                              see what insights you
                              uncover. If Equity
                              Circle isn't
                              for you, cancel any
                              time.</p></div></div><div className="banner-carousel-card_banner-carousel-card__cta__LSSr0"><a className="secondary-button_secondary-cta__ywfX1 secondary-button_secondary-cta--theme-dark__mZVoR" tabIndex={0} href="#"><span className="secondary-button_secondary-cta__label__Ba4op">Learn
                              More</span></a></div></div></div></div></div></div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh spacer spacer_spacer--medium__jX0Eb" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp spacer spacer_spacer--large__IyVm7" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp headline-left-aligned headline-left-aligned_headline-left-aligned--stacked__wFlr2 headline-left-aligned_headline-left-aligned--with-cta__mTdla headline-left-aligned_headline-left-aligned--cta-only__ipd_m"><div className="module-content_module-content__JtNA_ module-content_module-content--flexible-grid__NvyyD headline-left-aligned_headline-left-aligned__container__anhhL"><h2 className="heading_heading__Gh8z9 heading_heading--size-xl__pvIP0 headline-left-aligned_headline-left-aligned__headline__YSkmi" style={{opacity: 1, transform: 'none'}}>What to
                    expect when you join</h2><div className="headline-left-aligned_headline-left-aligned__content__VC3EH" /><div className="headline-left-aligned_headline-left-aligned__cta__TCpUz" style={{opacity: 1, transform: 'none'}}><div className="utility-hero__cta"><a className="secondary-button_secondary-cta__ywfX1 secondary-button_secondary-cta--theme-light__n9y5O" href="#"><span className="secondary-button_secondary-cta__label__Ba4op">Learn
                          More</span></a></div></div></div></div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp spacer spacer_spacer--small__kYuOG" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp three-up-cards three-up-cards_three-up-cards--theme-dark__RK6YU"><div className="module-content_module-content__JtNA_ three-up-cards_three-up-cards__container__xf8ow slick-carousel slick-dark"><div className="three-up-cards__card" aria-hidden="false" style={{}}><div className="image-wrapped_wrapped-image__c3jd0 three-up-cards_three-up-cards__image__BoP_u" data-aspect-ratio="3:4"><img alt="Equity Circle 4.0 Device, Band and Battery " loading="lazy" width={3000} height={4000} decoding="async" data-nimg={1} style={{color: 'transparent'}} src="./images/1-world-class-tech-alt2__1_.webp" /></div><p className="text_text__NFIw2 text_text--size-lg__uWJQC three-up-cards_three-up-cards__heading__ZMJI1" style={{opacity: 1, transform: 'none'}}>World-class
                      wearable tech</p><div className="rich-text_rich-text__y_zI2 three-up-cards__content" style={{opacity: 1, transform: 'none'}}><p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">Get
                        the state-of-the-art Equity Circle
                        sensor,
                        an ultra-durable, ultra-comfortable
                        Onyx SuperKnit band, and a
                        waterproof, wireless battery
                        pack—all included with purchase.
                        Equity Circle is IP68 dust-proof and
                        water-resistant at depths&nbsp;up to
                        10 meters (roughly 32 feet) for up
                        to 2 hours and lasts up to 5 days on
                        a single charge.
                      </p></div></div><div className="three-up-cards__card" aria-hidden="false" style={{}}><div className="image-wrapped_wrapped-image__c3jd0 three-up-cards_three-up-cards__image__BoP_u" data-aspect-ratio="3:4"><img alt="" loading="lazy" width={599} height={798} decoding="async" data-nimg={1} style={{color: 'transparent'}} src="./images/Update_membership_module__1__3.png" /></div><p className="text_text__NFIw2 text_text--size-lg__uWJQC three-up-cards_three-up-cards__heading__ZMJI1" style={{opacity: 1, transform: 'none'}}>Personalized
                      app</p><div className="rich-text_rich-text__y_zI2 three-up-cards__content" style={{opacity: 1, transform: 'none'}}><p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">Equity
                        Circle
                        calibrates to your unique baseline
                        and calculates daily performance
                        scores, health metrics, real-time
                        stress levels, and trends over time.
                        You can also get real-time answers
                        from Equity Circle Coach, the
                        all-new,
                        AI-powered feature that uses your
                        personal Equity Circle data, and the
                        latest
                        in human performance science to give
                        you custom performance coaching.
                      </p></div></div><div className="three-up-cards__card" aria-hidden="false" style={{}}><div className="image-wrapped_wrapped-image__c3jd0 three-up-cards_three-up-cards__image__BoP_u" data-aspect-ratio="3:4"><img alt="Equity Circle labs study. " loading="lazy" width={3000} height={4000} decoding="async" data-nimg={1} style={{color: 'transparent'}} src="./images/3-research-alt__1___1_.webp" /></div><p className="text_text__NFIw2 text_text--size-lg__uWJQC three-up-cards_three-up-cards__heading__ZMJI1" style={{opacity: 1, transform: 'none'}}>Cutting-edge
                      science</p><div className="rich-text_rich-text__y_zI2 three-up-cards__content" style={{opacity: 1, transform: 'none'}}><p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">Equity
                        Circle
                        is always evolving with monthly
                        feature updates that are fueled by
                        the best minds in data science,
                        health, sport, and human
                        performance. You can also listen to
                        the Equity Circle Podcast and access
                        the <a className="inline-link" href="#">Equity
                          Circle
                          blog</a>, The Locker for
                        extensive articles about all things
                        human
                        performance.</p></div></div></div>
              </div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp spacer spacer_spacer--medium__jX0Eb" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-gray__F5GW6 spacer spacer_spacer--medium__jX0Eb" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-gray__F5GW6 headline-left-aligned headline-left-aligned_headline-left-aligned--stacked__wFlr2"><div className="module-content_module-content__JtNA_ module-content_module-content--flexible-grid__NvyyD headline-left-aligned_headline-left-aligned__container__anhhL"><h2 id="choose-plan" className="heading_heading__Gh8z9 heading_heading--size-xl__pvIP0 headline-left-aligned_headline-left-aligned__headline__YSkmi" style={{opacity: 1, transform: 'none'}}>Choose
                    a plan that works for you</h2><div className="headline-left-aligned_headline-left-aligned__content__VC3EH" /></div></div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-gray__F5GW6 sign-up-routing_sign-up-routing__4fYEb"><div className="module-content_module-content__JtNA_ sign-up-routing_sign-up-routing__grid__BL9XP"><div className="membership-card_membership-card__zmtSR" role="button" tabIndex={0} style={{opacity: 1, transform: 'none'}}><div className="membership-card_membership-card__price-container__I3vPk"><p className="heading_heading__Gh8z9 heading_heading--size-md__ieBjS membership-card_membership-card__price__bdweR"><span className>£384</span></p><p className="text_text__NFIw2 text_text--size-lg__uWJQC membership-card_membership-card__frequency___Bh_7">Upfront</p></div><div className="membership-card__commitment-container"><p className="text_text__NFIw2 text_text--size-lg__uWJQC membership-card_membership-card__commitment-heading__jyFzS">24
                        Month Membership</p><a href="#" className="membership-card_membership-card__link__JTZ1B" target="_blank" aria-hidden="true" tabIndex={-1}><button aria-hidden="true" className="icon-button_icon-button__cnqXV icon-button_icon-button--dark__imazq icon-button_icon-button--size-sm__V_r6R membership-card__link-button"><span className="icon-button_icon-button__svg-wrapper__TyXaJ icon-button_icon-button__svg-direction--right__iT2Rf" style={{width: '20px', height: '20px'}}><svg width={24} height={24} viewBox="0 0 24 24" fill="none" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M11.4718 21L13.6082 21L13.6082 8.18182L19.4832 14.0568L21 12.54L12.54 4.08L4.08002 12.54L5.59684 14.0568L11.4718 8.18182L11.4718 21Z" fill="#ffffffff" /></svg></span></button></a></div></div><div className="membership-card_membership-card__zmtSR" role="button" tabIndex={0} style={{opacity: 1, transform: 'none'}}><div className="membership-card_membership-card__badge__BJNgy membership-card_membership-card__badge--color-green__XQGK0"><p className="text_text__NFIw2 text_text--size-sm__b7SaZ">Most
                        popular</p></div><div className="membership-card_membership-card__price-container__I3vPk"><p className="heading_heading__Gh8z9 heading_heading--size-md__ieBjS membership-card_membership-card__price__bdweR"><span className>£229</span></p><p className="text_text__NFIw2 text_text--size-lg__uWJQC membership-card_membership-card__frequency___Bh_7">Upfront</p></div><div className="membership-card__commitment-container"><p className="text_text__NFIw2 text_text--size-lg__uWJQC membership-card_membership-card__commitment-heading__jyFzS">Annual
                        Membership</p><a href="#" className="membership-card_membership-card__link__JTZ1B" target="_blank" aria-hidden="true" tabIndex={-1}><button aria-hidden="true" className="icon-button_icon-button__cnqXV icon-button_icon-button--dark__imazq icon-button_icon-button--size-sm__V_r6R membership-card__link-button"><span className="icon-button_icon-button__svg-wrapper__TyXaJ icon-button_icon-button__svg-direction--right__iT2Rf" style={{width: '20px', height: '20px'}}><svg width={24} height={24} viewBox="0 0 24 24" fill="none" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M11.4718 21L13.6082 21L13.6082 8.18182L19.4832 14.0568L21 12.54L12.54 4.08L4.08002 12.54L5.59684 14.0568L11.4718 8.18182L11.4718 21Z" fill="#ffffffff" /></svg></span></button></a></div></div><div className="membership-card_membership-card__zmtSR" role="button" tabIndex={0} style={{opacity: 1, transform: 'none'}}><div className="membership-card_membership-card__badge__BJNgy membership-card_membership-card__badge--color-green__XQGK0"><p className="text_text__NFIw2 text_text--size-sm__b7SaZ">Best
                        value</p></div><div className="membership-card_membership-card__price-container__I3vPk"><p className="heading_heading__Gh8z9 heading_heading--size-md__ieBjS membership-card_membership-card__price__bdweR"><span className>£191</span></p><p className="text_text__NFIw2 text_text--size-lg__uWJQC membership-card_membership-card__frequency___Bh_7">Lowest
                        price</p></div><div className="membership-card__commitment-container"><p className="text_text__NFIw2 text_text--size-lg__uWJQC membership-card_membership-card__commitment-heading__jyFzS">Family
                        Membership</p><p className="text_text__NFIw2 text_text--size-sm__b7SaZ membership-card_membership-card__commitment-fine-print__3achX">2-6
                        members, one bill, more value.</p><a href="#" className="membership-card_membership-card__link__JTZ1B" target="_blank" aria-hidden="true" tabIndex={-1}><button aria-hidden="true" className="icon-button_icon-button__cnqXV icon-button_icon-button--dark__imazq icon-button_icon-button--size-sm__V_r6R membership-card__link-button"><span className="icon-button_icon-button__svg-wrapper__TyXaJ icon-button_icon-button__svg-direction--right__iT2Rf" style={{width: '20px', height: '20px'}}><svg width={24} height={24} viewBox="0 0 24 24" fill="none" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M11.4718 21L13.6082 21L13.6082 8.18182L19.4832 14.0568L21 12.54L12.54 4.08L4.08002 12.54L5.59684 14.0568L11.4718 8.18182L11.4718 21Z" fill="#ffffffff" /></svg></span></button></a></div></div><div className="membership-card_membership-card__zmtSR" role="button" tabIndex={0} style={{opacity: 1, transform: 'none'}}><div className="membership-card_membership-card__badge__BJNgy membership-card__badge--color-custom" style={{backgroundColor: 'rgb(0, 0, 0)', color: 'white'}}><p className="text_text__NFIw2 text_text--size-sm__b7SaZ">Free
                        trial</p></div><div className="membership-card_membership-card__price-container__I3vPk"><p className="heading_heading__Gh8z9 heading_heading--size-md__ieBjS membership-card_membership-card__price__bdweR"><span className>£0</span></p><p className="text_text__NFIw2 text_text--size-lg__uWJQC membership-card_membership-card__frequency___Bh_7">Try
                        before you join</p></div><div className="membership-card__commitment-container"><p className="text_text__NFIw2 text_text--size-lg__uWJQC membership-card_membership-card__commitment-heading__jyFzS">1
                        Month Free Trial</p><p className="text_text__NFIw2 text_text--size-sm__b7SaZ membership-card_membership-card__commitment-fine-print__3achX">Includes
                        pre-owned device.</p><a href="#" className="membership-card_membership-card__link__JTZ1B" target="_blank" aria-hidden="true" tabIndex={-1}><button aria-hidden="true" className="icon-button_icon-button__cnqXV icon-button_icon-button--dark__imazq icon-button_icon-button--size-sm__V_r6R membership-card__link-button"><span className="icon-button_icon-button__svg-wrapper__TyXaJ icon-button_icon-button__svg-direction--right__iT2Rf" style={{width: '20px', height: '20px'}}><svg width={24} height={24} viewBox="0 0 24 24" fill="none" role="presentation" focusable="false" xmlns="http://www.w3.org/2000/svg"><path d="M11.4718 21L13.6082 21L13.6082 8.18182L19.4832 14.0568L21 12.54L12.54 4.08L4.08002 12.54L5.59684 14.0568L11.4718 8.18182L11.4718 21Z" fill="#ffffffff" /></svg></span></button></a></div></div></div></div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-gray__F5GW6 spacer spacer_spacer--medium__jX0Eb" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh spacer spacer_spacer--medium__jX0Eb" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh headline-left-aligned headline-left-aligned_headline-left-aligned--stacked__wFlr2"><div className="module-content_module-content__JtNA_ module-content_module-content--flexible-grid__NvyyD headline-left-aligned_headline-left-aligned__container__anhhL"><h2 className="heading_heading__Gh8z9 heading_heading--size-xl__pvIP0 headline-left-aligned_headline-left-aligned__headline__YSkmi" style={{opacity: 1, transform: 'none'}}>Share
                    your metrics. Build community. </h2><div className="headline-left-aligned_headline-left-aligned__content__VC3EH" /></div></div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh spacer spacer_spacer--medium__jX0Eb" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh three-up-cards"><div className="module-content_module-content__JtNA_ three-up-cards_three-up-cards__container__xf8ow slick-carousel">
                  <div className="three-up-cards__card" aria-hidden="false" style={{}}><div className="image-wrapped_wrapped-image__c3jd0 three-up-cards_three-up-cards__image__BoP_u" data-aspect-ratio="3:4"><img alt="" loading="lazy" width={3000} height={4000} decoding="async" data-nimg={1} style={{color: 'transparent'}} src="./images/en-low-stress.webp" /></div><p className="text_text__NFIw2 text_text--size-lg__uWJQC three-up-cards_three-up-cards__heading__ZMJI1" style={{opacity: 1, transform: 'none'}}>Connect
                      on Social</p><div className="rich-text_rich-text__y_zI2 three-up-cards__content" style={{opacity: 1, transform: 'none'}}><p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">Overlay
                        your real-time Equity Circle data on
                        photos
                        or videos to share with friends or
                        post to social
                        media.</p></div></div><div className="three-up-cards__card" aria-hidden="false" style={{}}><div className="image-wrapped_wrapped-image__c3jd0 three-up-cards_three-up-cards__image__BoP_u" data-aspect-ratio="3:4"><img alt="" loading="lazy" width={3000} height={4000} decoding="async" data-nimg={1} style={{color: 'transparent'}} src="./images/en-health-report.webp" /></div><p className="text_text__NFIw2 text_text--size-lg__uWJQC three-up-cards_three-up-cards__heading__ZMJI1" style={{opacity: 1, transform: 'none'}}>Share
                      with Healthcare Providers</p><div className="rich-text_rich-text__y_zI2 three-up-cards__content" style={{opacity: 1, transform: 'none'}}><p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">Share
                        your data and reports with your
                        providers to improve your care and
                        advocate for yourself.
                      </p></div></div><div className="three-up-cards__card" aria-hidden="false" style={{}}><div className="image-wrapped_wrapped-image__c3jd0 three-up-cards_three-up-cards__image__BoP_u" data-aspect-ratio="3:4"><img alt="" loading="lazy" width={3000} height={4000} decoding="async" data-nimg={1} style={{color: 'transparent'}} src="./images/en-community-teams.webp" /></div><p className="text_text__NFIw2 text_text--size-lg__uWJQC three-up-cards_three-up-cards__heading__ZMJI1" style={{opacity: 1, transform: 'none'}}>Join
                      Equity Circle Teams</p><div className="rich-text_rich-text__y_zI2 three-up-cards__content" style={{opacity: 1, transform: 'none'}}><p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">Create
                        or join a team to share your data,
                        get motivated, and exchange tips and
                        encouragement in the
                        chat.</p></div></div></div>
              </div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh spacer spacer_spacer--large__IyVm7" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh headline-left-aligned headline-left-aligned_headline-left-aligned--stacked__wFlr2">
                <div className="module-content_module-content__JtNA_ module-content_module-content--flexible-grid__NvyyD headline-left-aligned_headline-left-aligned__container__anhhL">
                  <h2 className="heading_heading__Gh8z9 heading_heading--size-xl__pvIP0 headline-left-aligned_headline-left-aligned__headline__YSkmi" style={{opacity: 1, transform: 'none'}}>Build
                    your community</h2>
                  <div className="headline-left-aligned_headline-left-aligned__content__VC3EH" />
                </div>
              </div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh spacer spacer_spacer--small__kYuOG" />
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh feature-block_feature-block___ZNm8 feature-block_feature-block--with-cta__Qkse1">
                <div className="module-content_module-content__JtNA_ module-content_module-content--flexible-grid__NvyyD">
                  <div className="feature-block_feature-block__media__vs1FT feature-block_feature-block__media--rectangle__z_pqQ feature-block_feature-block__media--image__xrGSz">
                    <div className="image-wrapped_wrapped-image__c3jd0 feature-block_feature-block__image__FA5rb" data-aspect-ratio="16:9">
                      <img alt="" loading="lazy" width={2500} height={1666} decoding="async" data-nimg={1} style={{color: 'transparent'}} srcSet src="./images/2-Equity_Circle_Malibu_Lake_00735.jpg" />
                    </div>
                  </div>
                  <div className="feature-block_feature-block__grid__RdnO6 feature-block_feature-block__grid--without-heading__no4Bk">
                    <div className="feature-block_feature-block__text-wrap__RCn57">
                      <div className="rich-text_rich-text__y_zI2 feature-block_feature-block__copy__ReljJ" style={{opacity: 1, transform: 'none'}}>
                        <p className="text_text__NFIw2 text_text--size-lg__uWJQC block-paragraph">Join
                          or create a Equity Circle Team
                          in the app for extra motivation
                          (and competition), check out
                          in-person events, talks or
                          workouts, download our weekly
                          podcast to hear from some of the
                          brightest minds in human
                          performance, and surround
                          yourself with the energy and
                          inspiration of like-minded
                          people from all over the
                          world.</p>
                      </div>
                      <a href="#" className="secondary-button_secondary-cta__ywfX1 secondary-button_secondary-cta--theme-dark__mZVoR feature-block_feature-block__cta__6IqdX">
                        <span className="secondary-button_secondary-cta__label__Ba4op">Shop
                          Now</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-light__Eyjjh spacer spacer_spacer--large__IyVm7" />
            </div>
          </main>
          <div className="default-layout_layout__footer__8DYb8">
            <div className="module-wrapper_module-wrapper__ONmYZ module-wrapper_module-wrapper--theme-dark__AUYZp">
              <div className="module-content_module-content__JtNA_">
                <footer className="footer_footer__mTxNf" id="Equity Circle-footer">
                  <nav aria-label="Footer" className="footer_footer-navigation-links__Ga76A">
                    <div>
                      <h2 className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__heading__i4DOl">Support</h2>
                      <ul aria-label="Support links">
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Member
                            Support</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Order
                            Status</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Rejoin
                            Equity Circle</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Member
                            Login</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Equity
                            Circle Labs</a></li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__heading__i4DOl">Company</h2>
                      <ul aria-label="Company links">
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Support</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Developers</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Engineering</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Careers</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Our
                            Mission</a></li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__heading__i4DOl">Legal</h2>
                      <ul aria-label="Legal links">
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Terms
                            of Use</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Terms
                            of Sale</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Privacy</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Minimum
                            Advertised Pricing
                            Policy</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Security</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Patent</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Full
                            Privacy Policy</a></li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__heading__i4DOl">Partner</h2>
                      <ul aria-label="Partner links">
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Become an
                            Affiliate</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Developers</a></li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__heading__i4DOl">Join
                        Equity Circle</h2>
                      <ul aria-label="Join Equity Circle links">
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Get
                            Equity Circle</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Refer a
                            Friend</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Gift Equity
                            Circle 4.0</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Equity
                            Circle x CR7</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Corporate
                            Gifting</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">Hero
                            Discounts</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#" target="_blank">Student
                            Discount</a></li>
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a target="_blank" href="#">Store
                            Locator</a></li>
                      </ul>
                    </div>
                    <div>
                      <h2 className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__heading__i4DOl">The
                        Locker</h2>
                      <ul aria-label="The Locker links">
                        <li className="text_text__NFIw2 text_text--size-sm__b7SaZ footer_footer-navigation-links__items__pjcpl"><a href="#">The
                            Locker</a></li>
                      </ul>
                    </div>
                  </nav>
                  <div className="footer_footer-bottom-bar__IeIL7">
                    <div className="footer_footer-bottom-bar__logo__hTiOH">
                      <img src="./images/Equity_Circle.png" width={130} alt="" />
                      <div className="footer_footer-bottom-bar__mission__Rrdwm">
                        <div className="rich-text_rich-text__y_zI2">
                          <p className="text_text__NFIw2 text_text--size-xs__iI9h7 block-paragraph">Our
                            mission at Equity Circle is
                            to unlock human performance.
                            When you choose to partner
                            with us, we’ll do everything
                            we can to help you find your
                            inner potential.</p>
                        </div>
                      </div>
                    </div>
                    <div className="footer_footer-newsletter__Vekg5">
                      <form className="newsletter-form_field-container__xRqTM newsletter-form_field-container--variant-default__jvxua">
                        <div className="newsletter-form_field-container__input-wrapper__oN7b5">
                          <input type="email" className="newsletter-form_field-container__input__4cKpi" placeholder="Enter your email" />
                          <button type="submit" className="newsletter-form_field-container__button__D__QO">
                            <span className="text_text__NFIw2 text_text--size-sm__b7SaZ">Submit</span>
                          </button>
                        </div>
                        <span className="text_text__NFIw2 text_text--size-sm__b7SaZ newsletter-form_field-container__state-messages__Ny_Sl">By
                          signing up, I agree with the
                          data protection policy.</span>
                      </form>
                    </div>
                    <div className="footer_footer-bottom-bar__legal__lR_n9">
                      <div className="footer_footer-bottom-bar__copyright__qZtDm">
                        <p className="text_text__NFIw2 text_text--size-xs__iI9h7">©
                          2025 Equity Circle</p>
                      </div>
                      <div className="footer_footer-bottom-bar__legal-items-container__Bn5iw">
                        <div className="footer_footer-bottom-bar__legal-items__FEeh8" />
                        <div className="footer_footer-bottom-bar__country-selector__PUqxQ">
                          <div className="country-selector">
                            <button type="button" role="combobox" aria-controls="radix-:Ratrjdda:" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="country-selector_country-selector__select-trigger__JP0uz">
                              <span style={{pointerEvents: 'none'}}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 513 342">
                                  <g fill="#FFF">
                                    <path d="M0 0h513v341.3H0V0z" />
                                    <path d="M311.7 230 513 341.3v-31.5L369.3 230h-57.6zM200.3 111.3 0 0v31.5l143.7 79.8h56.6z" />
                                  </g>
                                  <path d="M393.8 230 513 295.7V230H393.8zm-82.1 0L513 341.3v-31.5L369.3 230h-57.6zm146.9 111.3-147-81.7v81.7h147zM90.3 230 0 280.2V230h90.3zm110 14.2v97.2H25.5l174.8-97.2zm-82.1-132.9L0 45.6v65.7h118.2zm82.1 0L0 0v31.5l143.7 79.8h56.6zM53.4 0l147 81.7V0h-147zm368.3 111.3L513 61.1v50.2h-91.3zm-110-14.2V0h174.9L311.7 97.1z" fill="#0052B4" />
                                  <g fill="#D80027">
                                    <path d="M288 0h-64v138.7H0v64h224v138.7h64V202.7h224v-64H288V0z" />
                                    <path d="M311.7 230 513 341.3v-31.5L369.3 230h-57.6zm-168 0L0 309.9v31.5L200.3 230h-56.6zm56.6-118.7L0 0v31.5l143.7 79.8h56.6zm168 0L513 31.5V0L311.7 111.3h56.6z" />
                                  </g>
                                </svg>GB
                              </span>
                              <span aria-hidden="true" className="country-selector_country-selector__select-icon__8cpDE">
                                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" role="presentation" focusable="false" viewBox="0 0 24 24">
                                  <path d="M7 14L12 9L17 14" stroke="#000000ff" strokeWidth={2} strokeLinecap="square" strokeLinejoin="round" />
                                </svg>
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
