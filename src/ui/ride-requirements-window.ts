import { compute, dropdownSpinner, groupbox, label, vertical, window } from 'openrct2-flexui';
import { RideRequirementsViewModel } from './ride-requirements-viewmodel';

const viewModel = new RideRequirementsViewModel();

export const rideRequirementsWindow = window({
  title: 'Ride Requirements',
  width: 400,
  height: 300,
  spacing: 5,
  onOpen: () => viewModel.onWindowOpen(),
  onClose: () => viewModel.onWindowClose(),
  content: [
    groupbox({
      text: 'Select a Ride',
      content: [
        dropdownSpinner({
          items: compute(viewModel.rides, rides => rides.map(ride => ride.name)),
          tooltip: 'List of rides in the park',
          selectedIndex: compute(viewModel.selectedRide, r => r ? r[1] : 0),
          onChange: idx => viewModel.selectedRide.set([viewModel.rides.get()[idx], idx]),
        })
      ]
    }),
    groupbox({
      text: 'Ratings Data',
      content: [
        vertical([
          // TODO
          label({ text: 'No ratings available.', alignment: 'centred' })
        ])
      ]
    })
  ]
});
