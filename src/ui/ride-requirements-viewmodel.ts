import { store, WritableStore } from 'openrct2-flexui';
import { getAllRides } from '../objects/rides';

export class RideRequirementsViewModel {
  readonly selectedRide = store<[Ride, number] | null>(null);
  readonly rides = store<Ride[]>([]);

  constructor() {
    this.rides.subscribe(r => updateSelectionOrNull(this.selectedRide, r));
  }

  /**
   * Reload available rides when the window opens.
   */
  onWindowOpen(): void {
    console.log('[RideRequirementsViewModel] Window opened!');
    this.rides.set(getAllRides());
  }

  /**
   * Disposes of the view model when the window closes.
   */
  onWindowClose(): void {
    console.log('[RideRequirementsViewModel] Window closed!');
  }
}

/**
 * Selects the correct entity based on the specified index in the store, or null if anything was deselected.
 */
function updateSelectionOrNull<T>(value: WritableStore<[T, number] | null>, items: T[]): void {
  let selection: [T, number] | null = null;

  if (items.length > 0) {
    const previous = value.get();
    const selectedIdx = (previous && previous[1] < items.length) ? previous[1] : 0;
    selection = [items[selectedIdx], selectedIdx];
  }

  console.log('[updateSelectionOrNull] =>', selection);
  value.set(selection);
}

