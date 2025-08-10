import Item from "./Item";
import { v4 as uuidv4 } from "uuid";

class Quote {
  private publicId: string = `QUOTE-${uuidv4()}`;
  private validUntil: Date = new Date(Date.now());

  constructor(
    private readonly items: Item[],
    publicId?: string,
    validUntil?: Date,
  ) {
    this.items = items;
    this.publicId = publicId ?? `QUOTE-${uuidv4()}`;

    if (validUntil) {
      this.validUntil = validUntil;
    } else {
      this.validUntil.setDate(this.validUntil.getDate() + 3);
    }
  }

  getPublicId(): string {
    return this.publicId;
  }

  getValidUntil(): Date {
    return this.validUntil;
  }

  getItems(): Item[] {
    return this.items;
  }

  addItem(item: Item): void {
    this.items.push(item);
  }
}

export default Quote;
