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

    if (CasperOverlay.isOverlayAnWizard(this)) {
      CasperOverlay.closeAllActiveNonWizardOverlays();
    }

    CasperOverlay.pushActiveOverlay(this);
  }
}];