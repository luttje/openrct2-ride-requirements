import { store, WritableStore } from 'openrct2-flexui';
import { getAllRides } from '../objects/rides';
import { enumKeyFromValue } from '../objects/enum';

export class RideRequirementsViewModel {
  readonly selectedRide = store<[Ride, number] | null>(null);
  readonly rides = store<Ride[]>([]);
  readonly selectedRideRatingsItems = store<ListViewItem[]>([]);
  readonly selectedRideModeItems = store<ListViewItem[]>([]);

  constructor() {
    this.rides.subscribe(r =>updateSelectionOrNull(this.selectedRide, r));
    this.selectedRide.subscribe(() => this.updateSelectedRideRatings());
  }

  /**
   * Reload available rides when the window opens.
   */
  onWindowOpen(): void {
    this.rides.set(getAllRides());
  }

  /**
   * Disposes of the view model when the window closes.
   */
  onWindowClose(): void {
  }

  /**
   * Updates the selected ride its ratings list view items.
   */
  updateSelectedRideRatings(): void {
    const selectedRide = this.selectedRide.get();

    if (!selectedRide) {
      this.selectedRideRatingsItems.set([]);
      return;
    }

    const typeDescriptor = selectedRide[0].rideTypeDescriptor;
    const ratingModifiers = typeDescriptor.ratingsData.modifiers;
    const newItems = Array<ListViewItem>(ratingModifiers.length);

    for (let i = 0; i < ratingModifiers.length; i++) {
      const modifier = ratingModifiers[i];
      const row = Array<string>(5);
      row[0] = enumKeyFromValue(RatingsModifierType, modifier.type);
      row[1] = modifier.threshold.toString();
      row[2] = modifier.excitement.toString();
      row[3] = modifier.intensity.toString();
      row[4] = modifier.nausea.toString();
      newItems[i] = row;
    }

    this.selectedRideRatingsItems.set(newItems);
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

  value.set(selection);
}

