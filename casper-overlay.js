/* 
 * Copyright (C) 2019 Cloudware S.A. All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

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
