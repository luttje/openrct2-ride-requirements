import { rideRequirementsWindow } from './ui/ride-requirements-window';

function onClickMenuItem() {
  rideRequirementsWindow.open();
}

export function startup() {
  if (typeof ui !== 'undefined') {
    ui.registerMenuItem('Show Ride Requirements', () => onClickMenuItem());
  }
}