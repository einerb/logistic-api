export default class Address {
  constructor(
    public name: string,
    public street: string,
    public city: string,
    public state: string,
    public country: string,
    public phone?: string,
    public postalCode?: string,
    public coordinates?: { lat: number; lng: number }
  ) {}
}
