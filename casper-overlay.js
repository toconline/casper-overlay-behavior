export class CasperOverlay {

  static pushActiveOverlay (overlay) {
    this.__activeOverlays = this.__activeOverlays || [];
    this.__activeOverlays.push(overlay);
  }

  static removeActiveOverlay (overlay) {
    this.__activeOverlays = this.__activeOverlays || [];
    this.__activeOverlays = this.__activeOverlays.filter(activeOverlay => activeOverlay !== overlay);
  }

  static async closeAllActiveNonWizardOverlays () {
    // Do not import the casper-wizard in the beginning to avoid circular dependencies.
    this.__wizardModule = this.__wizardModule || await import('/node_modules/@casper2020/casper-wizard/casper-wizard.js');

    this.__activeOverlays.forEach(activeOverlay => {
      if (!(activeOverlay instanceof this.__wizardModule.CasperWizard)) {
        activeOverlay.close();
      }
    });
  }

  static closeAllActiveOverlays () {
    this.__activeOverlays.forEach(activeOverlay => activeOverlay.close());
  }

  static get activeOverlays () {
    return this.__activeOverlays;
  }
}