describe FactoryBurgers::Models::Factory do
  let(:factory) { FactoryBot::Internal.factories.find(:user) }
  let(:blueprint) { FactoryBurgers::Models::Factory.new(factory) }

  it "builds data" do
    expect(blueprint.name).to eq("user")
    expect(blueprint.class_name).to eq("User")
    expect(blueprint.traits).to all(be_a(FactoryBurgers::Models::Trait))
    expect(blueprint.attributes).to all(be_a(FactoryBurgers::Models::Attribute))
  end

  it "includes all traits" do
    expect(blueprint.traits.map(&:name)).to include("silly")
    expect(blueprint.traits.map(&:name)).to include("serious")
  end

  it "includes all transients" do
    expect(blueprint.transients.map(&:name)).to include("superpowers")
    expect(blueprint.transients.map(&:name)).to include("weaknesses")
  end

  it "includes attributes" do
    expect(blueprint.attributes.map(&:name)).to include("login")
    expect(blueprint.attributes.map(&:name)).to include("email")
    expect(blueprint.attributes.map(&:name)).to include("name")
  end

  describe "to_h" do
    it "converts to a Hash" do
      expect(blueprint.to_h).to include({name: "user", class_name: "User"})
    end

    it "includes nested Hashes for traits" do
      expect(blueprint.to_h[:traits]).to all(be_a(Hash))
      expect(blueprint.to_h[:traits]).to all(include(:name))
    end

    it "includes nested Hashes for attributes" do
      expect(blueprint.to_h[:attributes]).to all(be_a(Hash))
      expect(blueprint.to_h[:attributes]).to all(include(:name))
    end
  end

  describe "to_json" do
    it "converts to JSON" do
      expect(blueprint.to_json).to be_a(String)
      expect(JSON.parse(blueprint.to_json)).to be_a(Hash)
    end
  end
end
