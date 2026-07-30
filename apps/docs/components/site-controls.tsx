'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import { DocumentNavigation } from './document-navigation';

import type { NavigationGroup } from '../lib/content';
import type { RegistrySearchEntry } from '../lib/registries';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

type Theme = 'system' | 'light' | 'dark';

function applyTheme(theme: Theme) {
  if (theme === 'system') {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = theme;
  }
}

export function SiteControls({
  navigation,
  registrySearchEntries,
}: {
  navigation: NavigationGroup[];
  registrySearchEntries: RegistrySearchEntry[];
}) {
  const mobileDialog = useRef<HTMLDialogElement>(null);
  const commandDialog = useRef<HTMLDialogElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const searchTrigger = useRef<HTMLButtonElement>(null);
  const commandOpener = useRef<HTMLElement | null>(null);
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState<Theme>('system');
  const [activeResult, setActiveResult] = useState(0);

  const pages = useMemo(() => {
    const entries = navigation.flatMap((group) =>
      group.pages.map((page) => ({
        category: group.label,
        description: page.frontmatter.description,
        status: page.frontmatter.status,
        title: page.frontmatter.title,
        url: page.url,
      })),
    );

    for (const registryEntry of registrySearchEntries) {
      const existingIndex = entries.findIndex(
        (entry) =>
          entry.url === registryEntry.url &&
          entry.title === registryEntry.title,
      );
      if (existingIndex >= 0) {
        entries[existingIndex] = registryEntry;
      } else {
        entries.push(registryEntry);
      }
    }

    return entries;
  }, [navigation, registrySearchEntries]);

  const results = pages.filter((page) =>
    `${page.title} ${page.category} ${page.description} ${page.status}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  useEffect(() => {
    setActiveResult(0);
  }, [query]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('docs-theme') as Theme | null;
    if (savedTheme && ['system', 'light', 'dark'].includes(savedTheme)) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        openCommandPalette(searchTrigger.current ?? undefined);
      }

      if (event.key === 'Escape' && commandDialog.current?.open) {
        event.preventDefault();
        closeCommandPalette();
      }
    };

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  function openCommandPalette(opener?: HTMLElement) {
    commandOpener.current =
      opener ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null);
    if (!commandDialog.current?.open) {
      commandDialog.current?.showModal();
    }
    requestAnimationFrame(() => searchInput.current?.focus());
  }

  function cycleTheme() {
    const nextTheme: Theme =
      theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';
    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem('docs-theme', nextTheme);
  }

  function closeCommandPalette() {
    commandDialog.current?.close();
  }

  function handleCommandClose() {
    setQuery('');
    const opener = commandOpener.current;
    commandOpener.current = null;
    setTimeout(() => {
      if (opener?.isConnected) {
        opener.focus();
      }
    }, 0);
  }

  function handleSearchKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (results.length === 0) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      setActiveResult(
        (current) => (current + direction + results.length) % results.length,
      );
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      document.getElementById(`command-result-${activeResult}`)?.click();
    }
  }

  return (
    <div className="site-controls">
      <button
        className="control-button mobile-menu-trigger"
        type="button"
        onClick={() => mobileDialog.current?.showModal()}
      >
        Menu
      </button>
      <button
        ref={searchTrigger}
        className="search-trigger"
        type="button"
        aria-label="Find a page"
        onClick={(event) => openCommandPalette(event.currentTarget)}
      >
        <span>Find a page</span>
        <kbd>⌘ K</kbd>
      </button>
      <button
        className="control-button theme-trigger"
        type="button"
        onClick={cycleTheme}
        aria-label={`Theme: ${theme}. Activate to switch theme.`}
      >
        {theme}
      </button>

      <dialog
        className="navigation-dialog"
        ref={mobileDialog}
        aria-labelledby="mobile-navigation-title"
      >
        <div className="dialog-header">
          <div>
            <p className="eyebrow">Browse</p>
            <h2 id="mobile-navigation-title">Documentation</h2>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Close navigation"
            onClick={() => mobileDialog.current?.close()}
          >
            ×
          </button>
        </div>
        <DocumentNavigation
          navigation={navigation}
          onNavigate={() => mobileDialog.current?.close()}
        />
      </dialog>

      <dialog
        className="command-dialog"
        ref={commandDialog}
        aria-labelledby="command-palette-title"
        onClose={handleCommandClose}
        onCancel={(event) => {
          event.preventDefault();
          closeCommandPalette();
        }}
      >
        <div className="dialog-header">
          <div>
            <p className="eyebrow">Navigate</p>
            <h2 id="command-palette-title">Find a page</h2>
          </div>
          <button
            className="icon-button"
            type="button"
            aria-label="Close command palette"
            onClick={closeCommandPalette}
          >
            ×
          </button>
        </div>
        <label className="search-field">
          <span className="visually-hidden">Search documentation pages</span>
          <input
            ref={searchInput}
            type="search"
            placeholder="Type a page or section…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleSearchKeyDown}
            role="combobox"
            aria-autocomplete="list"
            aria-controls="command-results"
            aria-expanded="true"
            aria-activedescendant={
              results.length > 0 ? `command-result-${activeResult}` : undefined
            }
          />
        </label>
        <div className="command-results" aria-live="polite">
          {results.length > 0 ? (
            <ul id="command-results" aria-label="Documentation pages">
              {results.map((page, index) => (
                <li key={page.url}>
                  <Link
                    id={`command-result-${index}`}
                    href={page.url}
                    onClick={closeCommandPalette}
                    data-active={index === activeResult ? '' : undefined}
                  >
                    <span>{page.title}</span>
                    <small>
                      {page.category} · {page.status}
                    </small>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">
              <span aria-hidden="true">↳</span>
              <p>No page matches “{query}” yet.</p>
              <small>More content arrives in Phase 5.</small>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
