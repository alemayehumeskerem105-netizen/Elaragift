"use client";

import { useState, useEffect, useRef } from "react";
import { PageTransition } from "@/components/ui/PageTransition";
import {
  gifts as initialGifts,
  categories as initialCategories,
  Gift,
  GiftCategory,
} from "@/lib/gift-data";

type Order = {
  id: string;
  customerName: string;
  email: string;
  items: { giftId: string; quantity: number; price: number }[];
  total: number;
  status: "pending" | "processing" | "delivered";
  date: string;
};

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerName: "Sarah Johnson",
    email: "sarah@example.com",
    items: [
      { giftId: "cake-1", quantity: 1, price: 1450 },
      { giftId: "flowers-2", quantity: 1, price: 880 },
    ],
    total: 2330,
    status: "delivered",
    date: "2024-03-01",
  },
  {
    id: "ORD-002",
    customerName: "Mike Chen",
    email: "mike@example.com",
    items: [{ giftId: "doll-2", quantity: 2, price: 580 }],
    total: 1160,
    status: "processing",
    date: "2024-03-05",
  },
  {
    id: "ORD-003",
    customerName: "Emma Davis",
    email: "emma@example.com",
    items: [
      { giftId: "choco-1", quantity: 1, price: 690 },
      { giftId: "scarf-3", quantity: 1, price: 790 },
    ],
    total: 1480,
    status: "pending",
    date: "2024-03-06",
  },
];

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [activeTab, setActiveTab] = useState<"gifts" | "orders" | "analytics">(
    "gifts",
  );

  // Gift management state
  const [gifts, setGifts] = useState<Gift[]>(initialGifts);
  const [categories, setCategories] =
    useState<GiftCategory[]>(initialCategories);
  const [editingGift, setEditingGift] = useState<Gift | null>(null);
  const [newCategory, setNewCategory] = useState("");
  const editFormRef = useRef<HTMLDivElement>(null);

  // Order management state
  const [orders] = useState<Order[]>(mockOrders);

  useEffect(() => {
    const loggedIn = localStorage.getItem("adminLoggedIn");
    if (loggedIn === "true") setIsLoggedIn(true);

    // Load data from localStorage
    const savedGifts = localStorage.getItem("adminGifts");
    const savedCategories = localStorage.getItem("adminCategories");

    if (savedGifts) setGifts(JSON.parse(savedGifts));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
  }, []);

  // Scroll to edit form when editing a gift
  useEffect(() => {
    if (editingGift && editFormRef.current) {
      editFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [editingGift]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username === "admin" &&
      password === "admin123" &&
      email === "admin@elara.com"
    ) {
      setIsLoggedIn(true);
      localStorage.setItem("adminLoggedIn", "true");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("adminLoggedIn");
  };

  // Gift management functions
  const saveGiftsToStorage = (newGifts: Gift[]) => {
    setGifts(newGifts);
    localStorage.setItem("adminGifts", JSON.stringify(newGifts));
  };

  const saveCategoriesToStorage = (newCategories: GiftCategory[]) => {
    setCategories(newCategories);
    localStorage.setItem("adminCategories", JSON.stringify(newCategories));
  };

  const handleEditGift = (gift: Gift) => {
    setEditingGift(gift);
  };

  const handleSaveGift = (updatedGift: Gift) => {
    const newGifts = gifts.map((g) =>
      g.id === updatedGift.id ? updatedGift : g,
    );
    saveGiftsToStorage(newGifts);
    setEditingGift(null);
  };

  const handleAddGift = () => {
    const newGift: Gift = {
      id: `gift-${Date.now()}`,
      name: "New Gift",
      price: 1000,
      image: "/placeholders/default.jpg",
      category: categories[0] || "Cakes",
      description: "New gift description",
      stock: 10,
    };
    const newGifts = [...gifts, newGift];
    saveGiftsToStorage(newGifts);
    setEditingGift(newGift);
    setActiveTab("gifts"); // Ensure we're on the gifts tab
  };

  const handleDeleteGift = (giftId: string) => {
    if (confirm("Are you sure you want to delete this gift?")) {
      const newGifts = gifts.filter((g) => g.id !== giftId);
      saveGiftsToStorage(newGifts);
    }
  };

  const handleAddCategory = () => {
    if (
      newCategory.trim() &&
      !categories.includes(newCategory as GiftCategory)
    ) {
      const newCategories = [...categories, newCategory as GiftCategory];
      saveCategoriesToStorage(newCategories);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = (category: GiftCategory) => {
    if (
      confirm(
        `Are you sure you want to delete the "${category}" category? This will affect all gifts in this category.`,
      )
    ) {
      const newCategories = categories.filter((c) => c !== category);
      saveCategoriesToStorage(newCategories);
      // Remove gifts from deleted category
      const newGifts = gifts.filter((g) => g.category !== category);
      saveGiftsToStorage(newGifts);
    }
  };

  if (!isLoggedIn) {
    return (
      <PageTransition>
        <section className="mx-auto max-w-md pb-10 pt-4 sm:pt-6">
          <div className="elara-card p-6">
            <h1 className="text-lg font-semibold text-(--elara-text) sm:text-2xl mb-4">
              Admin Login
            </h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-pink-500 focus:outline-none focus:ring-1 focus:ring-pink-500"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-pink-600 px-4 py-2 text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Login
              </button>
            </form>
          </div>
        </section>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <section className="mx-auto max-w-7xl pb-10 pt-4 sm:pt-6">
        <div className="elara-card space-y-6 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-semibold text-(--elara-text) sm:text-2xl">
              ELARA Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="rounded-md bg-slate-600 px-4 py-2 text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            >
              Logout
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-slate-200">
            <nav className="flex space-x-8">
              {[
                { id: "gifts", label: "Manage Gifts" },
                { id: "orders", label: "View Orders" },
                { id: "analytics", label: "Analytics" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-pink-500 text-pink-600"
                      : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Gifts Management */}
          {activeTab === "gifts" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Gift Management</h2>
                <button
                  onClick={handleAddGift}
                  className="rounded-md bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
                >
                  Add New Gift
                </button>
              </div>

              {/* Categories Management */}
              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {categories.map((category) => (
                    <span
                      key={category}
                      className="inline-flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-sm"
                    >
                      {category}
                      <button
                        onClick={() => handleDeleteCategory(category)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
                    className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
                  />
                  <button
                    onClick={handleAddCategory}
                    className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Gifts List */}
              <div className="space-y-4">
                {gifts.map((gift) => (
                  <div key={gift.id} className="rounded-lg border p-4">
                    {editingGift?.id === gift.id ? (
                      <div ref={editFormRef}>
                        <EditGiftForm
                          gift={editingGift}
                          categories={categories}
                          onSave={handleSaveGift}
                          onCancel={() => setEditingGift(null)}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <img
                              src={gift.image}
                              alt={gift.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div>
                              <h4 className="font-semibold">{gift.name}</h4>
                              <p className="text-sm text-slate-600">
                                {gift.category}
                              </p>
                              <p className="text-sm text-slate-600">
                                Stock: {gift.stock}
                              </p>
                              {gift.discount && (
                                <p className="text-sm text-green-600">
                                  Discount: {gift.discount}%
                                </p>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-slate-600 mt-2">
                            {gift.description}
                          </p>
                          <p className="font-semibold text-pink-600 mt-1">
                            ₹{gift.price}
                            {gift.discount && (
                              <span className="ml-2 text-green-600">
                                → ₹
                                {Math.round(
                                  gift.price * (1 - gift.discount / 100),
                                )}
                              </span>
                            )}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditGift(gift)}
                            className="rounded-md bg-blue-600 px-3 py-1 text-white text-sm hover:bg-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteGift(gift.id)}
                            className="rounded-md bg-red-600 px-3 py-1 text-white text-sm hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Management */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Order Management</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">Order #{order.id}</h4>
                        <p className="text-sm text-slate-600">
                          {order.customerName} - {order.email}
                        </p>
                        <p className="text-sm text-slate-600">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₹{order.total}</p>
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processing"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {order.items.map((item, index) => {
                        const gift = gifts.find((g) => g.id === item.giftId);
                        return (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {gift?.name || "Unknown Gift"} × {item.quantity}
                            </span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold text-slate-600">Total Sales</h3>
                  <p className="text-2xl font-bold text-pink-600">₹4,970</p>
                  <p className="text-sm text-green-600">+12% from last month</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold text-slate-600">Orders</h3>
                  <p className="text-2xl font-bold text-pink-600">3</p>
                  <p className="text-sm text-green-600">+50% from last month</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold text-slate-600">
                    Avg Order Value
                  </h3>
                  <p className="text-2xl font-bold text-pink-600">₹1,657</p>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="font-semibold text-slate-600">Total Gifts</h3>
                  <p className="text-2xl font-bold text-pink-600">
                    {gifts.length}
                  </p>
                  <p className="text-sm text-slate-600">In inventory</p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-4">Popular Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => {
                    const categoryGifts = gifts.filter(
                      (g) => g.category === category,
                    );
                    const totalValue = categoryGifts.reduce(
                      (sum, gift) => sum + gift.price * gift.stock,
                      0,
                    );
                    return (
                      <div
                        key={category}
                        className="flex items-center justify-between"
                      >
                        <span>{category}</span>
                        <div className="text-right">
                          <span className="font-semibold">
                            {categoryGifts.length} items
                          </span>
                          <span className="text-sm text-slate-600 ml-4">
                            ₹{totalValue.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}

function EditGiftForm({
  gift,
  categories,
  onSave,
  onCancel,
}: {
  gift: Gift;
  categories: GiftCategory[];
  onSave: (gift: Gift) => void;
  onCancel: () => void;
}) {
  const [editedGift, setEditedGift] = useState<Gift>(gift);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedGift);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            type="text"
            value={editedGift.name}
            onChange={(e) =>
              setEditedGift({ ...editedGift, name: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Category
          </label>
          <select
            value={editedGift.category}
            onChange={(e) =>
              setEditedGift({
                ...editedGift,
                category: e.target.value as GiftCategory,
              })
            }
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Price (₹)
          </label>
          <input
            type="number"
            value={editedGift.price}
            onChange={(e) =>
              setEditedGift({ ...editedGift, price: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Stock
          </label>
          <input
            type="number"
            value={editedGift.stock}
            onChange={(e) =>
              setEditedGift({ ...editedGift, stock: Number(e.target.value) })
            }
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Discount (%)
          </label>
          <input
            type="number"
            value={editedGift.discount || 0}
            onChange={(e) =>
              setEditedGift({
                ...editedGift,
                discount: Number(e.target.value) || undefined,
              })
            }
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
            min="0"
            max="100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Image URL
          </label>
          <input
            type="text"
            value={editedGift.image}
            onChange={(e) =>
              setEditedGift({ ...editedGift, image: e.target.value })
            }
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700">
          Description
        </label>
        <textarea
          value={editedGift.description}
          onChange={(e) =>
            setEditedGift({ ...editedGift, description: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2"
          rows={3}
          required
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-slate-600 px-4 py-2 text-white hover:bg-slate-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
