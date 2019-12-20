import { CasperOverlay } from './casper-overlay.js';
import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior/iron-overlay-behavior.js';

export const CasperOverlayBehavior = [...IronOverlayBehavior, {
  properties: {
    opened: {
      observer: '__casperOverlayOpenedChanged'
    }
  },

  __casperOverlayOpenedChanged: async function (opened) {
    if (!opened) return CasperOverlay.removeActiveOverlay(this);

    // Do not import the casper-wizard in the beginning to avoid circular dependencies.
    this.__wizardModule = this.__wizardModule || await import('/node_modules/@casper2020/casper-wizard/casper-wizard.js');

    if (this instanceof this.__wizardModule.CasperWizard) {
      CasperOverlay.closeAllActiveNonWizardOverlays();
    }

    CasperOverlay.pushActiveOverlay(this);
  }
}];