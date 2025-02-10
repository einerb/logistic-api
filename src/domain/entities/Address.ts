export default class Address {
  constructor(
    public street: string,
    public city: string,
    public state: string,
    public country: string,
    public postalCode?: string,
    public coordinates?: { lat: number; lng: number }
  ) {}
}
