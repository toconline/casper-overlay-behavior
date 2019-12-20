export class CasperOverlay {

  /**
   * This method adds an overlay to the list of the currently opened ones.
   *
   * @param {Element} overlay The overlay that was just opened.
   */
  static pushActiveOverlay (overlay) {
    this.__activeOverlays = this.__activeOverlays || [];
    this.__activeOverlays.push(overlay);
  }

  /**
   * This method removes an overlay from the list of the currently opened ones.
   *
   * @param {Element} overlay The overlay that was just closed.
   */
  static removeActiveOverlay (overlay) {
    this.__activeOverlays = this.__activeOverlays || [];
    this.__activeOverlays = this.__activeOverlays.filter(activeOverlay => activeOverlay !== overlay);
  }

  /**
   * This method closes all the active overlays that are not instances of the casper-wizard component.
   */
  static closeAllActiveNonWizardOverlays () {
    this.__activeOverlays.forEach(activeOverlay => {
      if (!this.isOverlayAnWizard(activeOverlay)) {
        activeOverlay.close();
      }
    })
  }

  /**
   * This method closes all the active overlays.
   */
  static closeAllActiveOverlays () {
    this.__activeOverlays.forEach(activeOverlay => activeOverlay.close());
  }

  /**
   * This method checks if a specific overlay is an instance of the casper-wizard component.
   *
   * @param {Element} overlay The element that will be checked.
   */
  static isOverlayAnWizard (overlay) {
    let currentConstructor = overlay.constructor;
    while (Object.getPrototypeOf(currentConstructor).is) {
      if (Object.getPrototypeOf(currentConstructor).is === 'casper-wizard') return true;

      currentConstructor = Object.getPrototypeOf(currentConstructor);
    }

    return false;
  }
}