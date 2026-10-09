"use client";

import { useId, useMemo, useState } from "react";
import { CalendarDays, ChevronDown, Eye, EyeOff, FileUp, Info, X } from "lucide-react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";

import { cn } from "@/lib/utils";
import { groupDigits } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { StatusDialog } from "@/components/feedback/status-dialog";

type InfoCopy = { title: string; content: string };

type FieldShellProps = {
  label: React.ReactNode;
  error?: string;
  info?: InfoCopy;
  className?: string;
  children: (id: string) => React.ReactNode;
};

/** Label + control + error, plus the optional "i" explainer the mobile inputs have. */
export function Field({ label, error, info, className, children }: FieldShellProps) {
  const id = useId();
  const [infoOpen, setInfoOpen] = useState(false);
  return (
    <div className={cn("flex flex-col gap-2.5", className)}>
      <div className="flex items-center gap-1.5">
        <Label htmlFor={id} className="text-base font-normal">
          {label}
        </Label>
        {info && (
          <button
            type="button"
            onClick={() => setInfoOpen(true)}
            aria-label={`About ${info.title}`}
            className="text-muted-foreground hover:text-foreground"
          >
            <Info className="size-4" />
          </button>
        )}
      </div>
      {children(id)}
      {error && <p className="text-xs text-destructive">{error}</p>}
      {info && (
        <StatusDialog open={infoOpen} onOpenChange={setInfoOpen} tone="info" title={info.title}>
          <p className="text-sm leading-relaxed text-muted-foreground">{info.content}</p>
        </StatusDialog>
      )}
    </div>
  );
}

type TextFieldProps = Omit<React.ComponentProps<typeof Input>, "onChange" | "value"> & {
  label: React.ReactNode;
  value: string;
  onValueChange?: (value: string) => void;
  /** "money" groups digits with commas while typing (formatMoney in the mobile app). */
  valueType?: "money";
  error?: string;
  info?: InfoCopy;
  fieldClassName?: string;
};

export function TextField({
  label,
  value,
  onValueChange,
  valueType,
  error,
  info,
  fieldClassName,
  className,
  readOnly,
  ...props
}: TextFieldProps) {
  const locked = readOnly || !onValueChange;
  return (
    <Field label={label} error={error} info={info} className={fieldClassName}>
      {(id) => (
        <Input
          id={id}
          value={value}
          readOnly={locked}
          inputMode={valueType === "money" ? "numeric" : props.inputMode}
          onChange={(e) => onValueChange?.(valueType === "money" ? groupDigits(e.target.value) : e.target.value)}
          aria-invalid={!!error || undefined}
          className={cn(
            locked && "bg-[#ececec] text-foreground/80",
            error && "border-destructive",
            className
          )}
          {...props}
        />
      )}
    </Field>
  );
}

export function PasswordField({
  label,
  value,
  onValueChange,
  error,
  ...props
}: Omit<TextFieldProps, "valueType" | "info">) {
  const [visible, setVisible] = useState(false);
  return (
    <Field label={label} error={error}>
      {(id) => (
        <div className="relative">
          <Input
            id={id}
            type={visible ? "text" : "password"}
            value={value}
            onChange={(e) => onValueChange?.(e.target.value)}
            aria-invalid={!!error || undefined}
            className={cn("pr-14", error && "border-destructive")}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-5 flex items-center text-[#888]"
          >
            {visible ? <Eye className="size-5" /> : <EyeOff className="size-5" />}
          </button>
        </div>
      )}
    </Field>
  );
}

/** Native date input; value is ISO (yyyy-mm-dd). */
export function DateField({
  label,
  value,
  onValueChange,
  max,
  min,
}: {
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  max?: string;
  min?: string;
}) {
  return (
    <Field label={label}>
      {(id) => (
        <div className="relative">
          <Input
            id={id}
            type="date"
            value={value}
            max={max}
            min={min}
            onChange={(e) => onValueChange(e.target.value)}
            className={cn(
              "pr-14 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:size-full [&::-webkit-calendar-picker-indicator]:opacity-0",
              !value && "text-[#c4c4c4]"
            )}
          />
          <CalendarDays className="pointer-events-none absolute top-1/2 right-5 size-5 -translate-y-1/2 text-[#888]" />
        </div>
      )}
    </Field>
  );
}

/**
 * Bottom-sheet picker, the web version of the mobile SelectInput
 * (string options, optional search, can be locked).
 */
export function SelectField({
  label,
  value,
  onSelect,
  options,
  placeholder = "Select option",
  searchable,
  disabled,
  error,
  className,
  size = "default",
}: {
  label: React.ReactNode;
  value: string;
  onSelect: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchable?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  size?: "default" | "sm";
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useMemo(
    () => options.filter((o) => o.toLowerCase().includes(query.toLowerCase())),
    [options, query]
  );

  return (
    <Field label={label} error={error} className={className}>
      {(id) => (
        <>
          <button
            id={id}
            type="button"
            disabled={disabled}
            onClick={() => setOpen(true)}
            aria-haspopup="dialog"
            className={cn(
              "flex w-full items-center justify-between gap-2 rounded-full border border-transparent bg-white text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:bg-[#ececec]",
              size === "sm" ? "h-10 px-4 text-xs" : "h-14 px-5 text-base",
              error && "border-destructive"
            )}
          >
            <span className={cn("truncate", !value && "text-[#c4c4c4]")}>{value || placeholder}</span>
            <ChevronDown className={cn("shrink-0", size === "sm" ? "size-4" : "size-5")} />
          </button>
          <Dialog
            open={open}
            onOpenChange={(o) => {
              setOpen(o);
              if (!o) setQuery("");
            }}
          >
            <DialogPortal>
              <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-black/50 data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
              <DialogPrimitive.Popup className="fixed bottom-0 left-1/2 z-50 flex max-h-[70dvh] min-h-[30dvh] w-full max-w-[430px] -translate-x-1/2 flex-col rounded-t-[24px] bg-white pt-3 pb-6 outline-none data-open:animate-in data-open:slide-in-from-bottom data-closed:animate-out data-closed:slide-out-to-bottom">
                <span className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#e0e0e0]" />
                <DialogTitle className="px-5 pb-2 text-base font-medium">{label}</DialogTitle>
                {searchable && (
                  <div className="px-5 pb-2">
                    <Input
                      autoFocus
                      placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="h-11 border-[#e6e6e6]"
                    />
                  </div>
                )}
                <ul className="flex-1 overflow-y-auto px-2" role="listbox">
                  {filtered.map((o) => (
                    <li key={o}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={o === value}
                        onClick={() => {
                          onSelect(o);
                          setOpen(false);
                          setQuery("");
                        }}
                        className={cn(
                          "w-full border-b border-[#eee] px-3 py-3.5 text-left text-base hover:bg-[#f7f7f7]",
                          o === value && "font-medium text-brand"
                        )}
                      >
                        {o}
                      </button>
                    </li>
                  ))}
                  {filtered.length === 0 && (
                    <li className="py-8 text-center text-sm text-muted-foreground">No results found</li>
                  )}
                </ul>
              </DialogPrimitive.Popup>
            </DialogPortal>
          </Dialog>
        </>
      )}
    </Field>
  );
}

/** Dashed drop zone for document uploads (ID, utility bill, collateral). */
export function UploadDropzone({
  title,
  description,
  accept,
  formats,
  maxSizeMB = 5,
  multiple,
  onFiles,
  error,
}: {
  title: string;
  description?: string;
  accept: string;
  formats: string;
  maxSizeMB?: number;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  error?: string | null;
}) {
  const id = useId();
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-brand/60 bg-[#eef0ef] px-4 py-6 text-center transition-colors hover:bg-brand-soft"
      >
        <FileUp className="size-7 text-brand" />
        <span className="text-sm font-medium text-brand">{title}</span>
        {description && <span className="text-xs text-muted-foreground">{description}</span>}
        <input
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => {
            onFiles(Array.from(e.target.files ?? []));
            e.target.value = "";
          }}
        />
      </label>
      {error && <p className="text-xs text-destructive">{error}</p>}
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>{formats}</span>
        <span>{maxSizeMB}mb max size</span>
      </div>
    </div>
  );
}

export function FileChip({ file, onRemove }: { file: { name: string; size?: number }; onRemove: () => void }) {
  const isPdf = file.name.toLowerCase().endsWith(".pdf");
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3.5">
      <span
        className={cn(
          "flex h-8 w-7 shrink-0 items-center justify-center rounded text-[8px] font-bold",
          isPdf ? "bg-danger-soft text-destructive" : "bg-brand-soft text-brand"
        )}
      >
        {isPdf ? "PDF" : "IMG"}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-base">{file.name}</p>
        {file.size != null && <p className="text-[10px] text-muted-foreground">{formatFileSize(file.size)}</p>}
      </div>
      <button type="button" onClick={onRemove} aria-label={`Remove ${file.name}`}>
        <X className="size-5" />
      </button>
    </div>
  );
}

export function formatFileSize(bytes: number) {
  return bytes >= 1024 * 1024 ? `${(bytes / (1024 * 1024)).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/** Validate a picked file like the mobile useDocumentPicker hook. */
export function checkFile(file: File | undefined, allowedTypes: string[], maxSizeMB: number) {
  if (!file) return { file: null, error: null };
  if (allowedTypes.length && !allowedTypes.includes(file.type)) {
    return { file: null, error: "Unsupported file type" };
  }
  if (file.size > maxSizeMB * 1024 * 1024) {
    return { file: null, error: `File is too large. Max size is ${maxSizeMB}MB` };
  }
  return { file, error: null };
}

/** The "I agree to Terms & Conditions" style checkbox. */
export function CheckboxRow({
  checked,
  onCheckedChange,
  children,
}: {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        className="size-5 shrink-0 cursor-pointer appearance-none rounded-md border border-[#bdbdbd] bg-white bg-center bg-no-repeat checked:border-brand checked:bg-brand checked:bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22white%22 stroke-width=%223%22><path d=%22M5 12l5 5L20 7%22/></svg>')] checked:bg-[length:14px]"
      />
      <span>{children}</span>
    </label>
  );
}
